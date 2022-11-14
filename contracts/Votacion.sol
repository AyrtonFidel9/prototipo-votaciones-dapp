// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Votacion {

    address private walletOwner;

    struct Voto{
        uint256 datetime;
        address socio;
        uint256 id_lista;
        bool voted;
    }

    event VotoData(
        uint256 datetime,
        address socio,
        uint256 id_lista,
        bool voted
    );

    struct Lista {
        uint256 id_lista;
        uint256 id_eleccion;
        string agencia;
        string nombre;
        uint256 votos;
    }

    event ListaData (
        uint256 id_lista,
        uint256 id_eleccion,
        string agencia,
        string nombre,
        uint256 votos
    );

    struct Eleccion {
        uint256 idEleccion;
        string fecha;
        bool finished;
        mapping (uint256 => Lista) listas;
        mapping (address => Voto) votos;
    }

    event EleccionData (
        uint256 idEleccion,
        string fecha,
        bool finished   
    );

    event dataOwner (address _wallet); // evento para saber la direccion de quien ejecuta el smart contract

    mapping (uint256 => Eleccion) public elecciones;

    constructor() {
        walletOwner = msg.sender;
    }

    modifier duplicateKeyLista(uint256 _idLista, uint256 _idEleccion){
        require(
            _idLista != 0, 
            'El id de la lista debe ser diferente de 0');
        require (
            elecciones[_idEleccion].listas[_idLista].id_lista == 0,     
            'La lista ha insertar ya existe');
        _;
    }

    modifier duplicateVote(address _wallet, uint256 _idEleccion) {
        Voto storage voto = elecciones[_idEleccion].votos[_wallet];
        require (
            !voto.voted, 
            'Su voto ya ha sido registrado');
        
        Eleccion storage election = elecciones[_idEleccion];
        require(
            !election.finished,
            'El proceso de eleccion a culminado, no se aceptan mas votos'
        );  
        _;
    }

    modifier duplicateEleccion (uint256 _idEleccion){
        require (
            elecciones[_idEleccion].idEleccion == 0,     
            'La eleccion ha insertar ya existe');
        _;
    }

    function agregarEleccion (uint256 _idEleccion, string memory _fecha) 
    public duplicateEleccion(_idEleccion){
        
        elecciones[_idEleccion].idEleccion = _idEleccion;
        elecciones[_idEleccion].fecha = _fecha;
        elecciones[_idEleccion].finished = false;

        emit EleccionData(_idEleccion, _fecha, false);
    }

    function finishEleccion (uint256 _idEleccion) public {
        Eleccion storage eleccion = elecciones[_idEleccion];
        eleccion.finished = true;

        emit EleccionData(eleccion.idEleccion, eleccion.fecha, eleccion.finished);
    }

    function agregarLista(
        uint256 _idLista, 
        uint256 _idEleccion,
        string memory _agencia, 
        string memory _nombre)
        public duplicateKeyLista(_idLista,_idEleccion)
    {
        elecciones[_idEleccion].listas[_idLista] = 
            Lista(_idLista,_idEleccion,_agencia,_nombre,0);

        emit ListaData(_idLista, _idEleccion, _agencia, _nombre, 0);
        emit dataOwner(walletOwner);
    }

    function verLista(uint256 _idLista, uint256 _idEleccion) 
        public view returns (Lista memory)
    {
        return(elecciones[_idEleccion].listas[_idLista]);
    }

    function sufragar (uint256 _idLista, uint256 _idEleccion) 
        public duplicateVote(msg.sender, _idEleccion) 
    {
        uint256 _datetime = block.timestamp;

        elecciones[_idEleccion].votos[msg.sender] = Voto(
            _datetime,
            msg.sender,
            _idLista,
            true
        );

        Lista storage _lista = elecciones[_idEleccion].listas[_idLista];
        _lista.votos++;

        emit ListaData (
            _lista.id_lista,
            _lista.id_eleccion, 
            _lista.agencia, 
            _lista.nombre, 
            _lista.votos
        ); 

        emit VotoData (
            _datetime, 
            msg.sender, 
            _idLista, 
            elecciones[_idEleccion].votos[msg.sender].voted
        );
    }
}