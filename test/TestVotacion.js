const VotacionContract = artifacts.require("Votacion");

contract("Votacion Contract Tests", () => {
    before(async ()=>{
        this.votacion = await VotacionContract.deployed();
    });

    it('migrate deployed successfully', async()=>{
        const address = this.votacion.address;
        assert.notEqual(address, null);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, undefined);
        assert.notEqual(address, '');
    });

    it('elecction created successfully - test', async ()=>{
        const newEleccion = await this.votacion.agregarEleccion(12, '01-01-2022');
        const elecctionList = newEleccion.logs[0].args;

        assert.equal(elecctionList.idEleccion, 12);
        assert.equal(elecctionList.fecha, '01-01-2022'); // la fecha se mantiene en este formato por el momento
        assert.equal(elecctionList.finished, false);
    });

    it('create a new list successfully - test', async()=>{
        const newList = await this.votacion.agregarLista(3,12,'Agencia La Matriz', 'Lista F');
        const listEvent = newList.logs[0].args;
        
        assert.equal(listEvent.id_lista, 3);
        assert.equal(listEvent.id_eleccion, 12);
        assert.equal(listEvent.agencia, 'Agencia La Matriz');
        assert.equal(listEvent.nombre, 'Lista F');
        assert.equal(listEvent.votos, 0);
    });

    it('validate duplicate key successfully - test', async () =>{
        try{
            await this.votacion.agregarLista(3,12,'Agencia La Matriz', 'Lista F');
        }catch(err){
            assert.include(err.message, 'La lista ha insertar ya existe');
        }
    });

    it('validate duplicate eleccion successfully - test', async () =>{
        try{
            await this.votacion.agregarEleccion(12, '01-01-2022');
        }catch(err){
            assert.include(err.message, 'La eleccion ha insertar ya existe');
        }
    });

    it('validate not id zero successfully - test', async () =>{
        try{
            await this.votacion.agregarLista(0,12,'Agencia La Matriz', 'Lista F');
        }catch(err){
            assert.include(err.message, 'El id de la lista debe ser diferente de 0');
        }
    });

    it('create new vote for list - test',async ()=>{
        //await this.votacion.agregarEleccion(12, '01-01-2022');
        await this.votacion.agregarLista(1,12,'Agencia La Matriz', 'Lista A');
        await this.votacion.agregarLista(2,12,'Agencia La Matriz', 'Lista B');
        //await this.votacion.agregarLista(3,12,'Agencia La Matriz', 'Lista C');
        
        const newVote = await this.votacion.sufragar(1,12);
        const listaEvent = newVote.logs[0].args;

        const votoEvent = newVote.logs[1].args;

        assert.equal(listaEvent.votos, 1);

        assert.notEqual(votoEvent.datetime, null);
        assert.equal(votoEvent.socio, '0xEB129323c7879ed4a894e5AdB9b5465020CD3A03');
        assert.notEqual(votoEvent.datetime, undefined);
        assert.notEqual(votoEvent.datetime, '');
        assert.notEqual(votoEvent.datetime, 0x0);
        assert.equal(votoEvent.id_lista, 1);
        assert.equal(votoEvent.voted, true);
    });

    it('not duplicate vote - test', async () =>{
        try{
            await this.votacion.sufragar(1,12);
        }catch(err){
            assert.include(err.message, 'Su voto ya ha sido registrado');
        }
    });

    it('finished election - test', async () =>{
        await this.votacion.agregarEleccion(3, '01-11-2022');
        const changeStateElection = await this.votacion.finishEleccion(3);  
        const eventElection = changeStateElection.logs[0].args;

        assert.equal(eventElection.finished, true);
    });

    it('not vote when finished a election - test', async () =>{
        try{
            await this.votacion.agregarEleccion(4, '03-11-2022');
            await this.votacion.finishEleccion(4);
            await this.votacion.agregarLista(1,4,'Agencia La Matriz', 'Lista A');
            await this.votacion.agregarLista(2,4,'Agencia La Matriz', 'Lista B');
            await this.votacion.finishEleccion(4);  
            await this.votacion.sufragar(1,4);
        }catch(err){
            assert.include(err.message, 'El proceso de eleccion a culminado, no se aceptan mas votos');
        }
    });
});
