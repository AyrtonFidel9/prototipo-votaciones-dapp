const VoteToken = artifact.require('VoteToken');

contract('VoteToken', (accounts) =>{
    
    const lista = accounts[1];
    const votante  = accounts[0];

    before(async()=>{
        this.token = await VoteToken.deployed();
    });

    it('migrate deployed successfully', async()=>{
        const address = this.token.address;
        assert.notEqual(address, null);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, undefined);
        assert.notEqual(address, '');
    });

    it("gives the owner of the token 1M tokens ", async()=>{
        let balance = await this.token.balanceOf(accounts[0]);
        //onsole.log(balance.toString());
        
        assert.equal(balance, '1000000', "Balance should be 1M tokens for contract creator");
        /*await this.token.transfer("0xdCCC48E2A50cCdF5F40ab0d54fD611dFA1e15240",1)
        balance = await this.token.balanceOf("0xdCCC48E2A50cCdF5F40ab0d54fD611dFA1e15240")
        console.log(balance.toString());*/
    });

    it('elecction created successfully - test', async ()=>{
        const newEleccion = await this.token.agregarEleccion(12, '01-01-2022');
        const elecctionList = newEleccion.logs[0].args;

        assert.equal(elecctionList._idEleccion, 12);
        assert.equal(elecctionList._fecha, '01-01-2022'); // la fecha se mantiene en este formato por el momento
        assert.equal(elecctionList._finished, false);

        const elecciones = await this.token.elecciones(12);
    });

    it('validate duplicate eleccion successfully - test', async () =>{
        try{
            await this.token.agregarEleccion(12, '01-01-2022');
        }catch(err){
            assert.include(err.message, 'La eleccion ha insertar ya existe');
        }
    });

    it('send vote successfully - test', async()=>{


        const idEleccion = 12;

        //await this.token.agregarEleccion(idEleccion, '01-01-2022');

        const balanceListOld = 
            await this.token.balanceOf(lista);
        const result = 
            await this.token.sufragar(idEleccion,lista);
        const balanceListCurrent = 
            await this.token.balanceOf(lista);
        const balanceExpected = parseInt(balanceListOld) + 1;

        const voter = result.logs[0].args;

        assert.notEqual(balanceListOld, balanceListCurrent);

        const conditionBalance = balanceListOld < balanceListCurrent;

        assert.equal(conditionBalance, true,
            `Balance Old: ${balanceListOld} and Balance Current: ${balanceListCurrent}`);
        
        assert.equal(parseInt(balanceListCurrent), balanceExpected);

        const voted = await this.token.haveVoteReceived(idEleccion,votante);
        assert.equal(voted, true);
        assert.equal(voter._wallet,accounts[0]);
        assert.equal(voter.voted,true);
    })

    it('validate if exists election - test', async ()=>{
        const idEleccion = 13;
        try{
            await this.token.sufragar(idEleccion,lista);
        }catch(err){
            assert.include(err.message, 'La eleccion para sufragar no costa en el registro');
        }
    });

    it('validate if vote exists in election - test', async ()=>{
        const idEleccion = 12;
        try{
            await this.token.sufragar(idEleccion,lista);
        }catch(err){
            assert.include(err.message, 'Su voto ya ha sido registrado');
        }
    });

    it('change state election finished successfully - test', async ()=>{
        const idEleccion = 12;
        const changeStateElection = await this.token.finishEleccion(idEleccion);  
        const eventElection = changeStateElection.logs[0].args;
        assert.equal(eventElection._finished, true);
    });

    it('validate if election proccess finished - test', async ()=>{
        const idEleccion = 13;
        try{
            await this.token.agregarEleccion(idEleccion, '01-01-2022');
            await this.token.finishEleccion(idEleccion); 
            await this.token.sufragar(idEleccion,lista);
        }catch(err){
            assert.include(err.message, 'El proceso de eleccion a culminado, no se aceptan mas votos');
        }
    });
});