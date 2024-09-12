describe('Forms App', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    it('sanity checks', () => {
        expect(1+2).to.equal(3)
    })

    const name = () => cy.get('input[name=name]');
    const size = () => cy.get('select[name=size]');
    const special = () => cy.get('input[name=special]');
    const ham = () => cy.get('input[name=ham]');
    const pepperoni = () => cy.get('input[name=pepperoni]');
    const pineapple = () => cy.get('input[name=pineapple]');
    const sausage = () => cy.get('input[name=sausage]');
    const submitBtn = () =>cy.get('button[class=submitBtn]')
    
    it('the proper elements exists', () => {
        name().should('exist')
        size().should('exist')
        special().should('exist')
        ham().should('exist')
        pepperoni().should('exist')
        pineapple().should('exist')
        sausage().should('exist')
    
    })
    
    describe('filling out inputs and cancelling', () => {

        it('submit button is disabled', () => {
            submitBtn().should('be.disabled')
        })

        it('can type inside the inputs', () => {

            name()
                .should('have.value', '')
                .type('manny')
                .should('have.value', 'manny')

            size()
                .should('have.value', '')
                .select('small')
                .should('have.value', 'small')
            ham()
                .check()
                .should('have.checked', 'true')
            sausage()
                .check()
                .should('have.checked', 'true')

            submitBtn().should('not.be.disabled')
        
        })

        
    })
    
    
})

