// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract VoteToken is ERC20, ERC20Burnable{

    struct Eleccion {
        uint16 idEleccion;
        string fecha;
        bool finished;
        mapping (address => bool) votosReceived;
    }
    
    event EleccionData (
        uint16 _idEleccion,
        string _fecha,
        bool _finished
    );

    event VoterData(address _wallet, bool voted);

    mapping (uint16 => Eleccion) public elecciones;
    uint256[] eleccionesRegistradas;

    constructor(uint256 initialSupply) ERC20 ("Ballot Nueva Esperanza", "BNE"){
        _mint(msg.sender, initialSupply);
    }

    modifier duplicateEleccion (uint16 _idEleccion){
        require (
            elecciones[_idEleccion].idEleccion == 0,     
            'La eleccion ha insertar ya existe');
        _;
    }


    modifier validateBallot(address _wallet, uint16 _idEleccion, string memory _fecha) {
        require (
            elecciones[_idEleccion].idEleccion != 0,     
            'La eleccion para sufragar no costa en el registro');

        uint256 tamanio = eleccionesRegistradas.length;

        for(uint16 i = 0; i <= tamanio; i++){
            if(compareStrings(elecciones[_idEleccion].fecha,_fecha)){
                require (
                !elecciones[_idEleccion].votosReceived[_wallet], 
                'Su voto ya ha sido registrado');
            }
        }

        require (
            !elecciones[_idEleccion].votosReceived[_wallet], 
            'Su voto ya ha sido registrado');
        
        Eleccion storage election = elecciones[_idEleccion];
        require(
            !election.finished,
            'El proceso de eleccion a culminado, no se aceptan mas votos'
        );  
        _;
    }
    
    function sufragar (uint16 _idEleccion, address _lista) 
        public validateBallot(msg.sender, _idEleccion, elecciones[_idEleccion].fecha)
    {
        Eleccion storage eleccion = elecciones[_idEleccion];
        eleccion.votosReceived[msg.sender] = true;
        emit VoterData(msg.sender, elecciones[_idEleccion].votosReceived[msg.sender]);
        transfer(_lista, 1);
    }

    function haveVoteReceived (uint16 _idEleccion, address _user) 
    public view returns (bool){
        return elecciones[_idEleccion].votosReceived[_user];
    }

    function agregarEleccion (uint16 _idEleccion, string memory _fecha) 
    public duplicateEleccion(_idEleccion){
        elecciones[_idEleccion].idEleccion = _idEleccion;
        elecciones[_idEleccion].fecha = _fecha;
        elecciones[_idEleccion].finished = false;        
        eleccionesRegistradas.push(_idEleccion);
        emit EleccionData(_idEleccion, _fecha, false);
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        if (bytes(a).length != bytes(b).length) {
            return false;
        }
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function finishEleccion (uint16 _idEleccion) public {
        Eleccion storage eleccion = elecciones[_idEleccion];
        eleccion.finished = true;

        emit EleccionData(eleccion.idEleccion, eleccion.fecha, eleccion.finished);
    }
}
