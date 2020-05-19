describe('text add evaluation', function(){
    it('asserts text can be added', function(){
        cy.visit('http://localhost:3000/pizza')

        cy.get('.name')
            .type('Ramona')
            .should('have.value', 'Ramona')

        cy.get('[type="checkbox"]')
            .check()

        cy.get('form')
            .submit()

        

    })
}) 