describe('Just visit e2e test', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    
    it('should visit', () => {
        cy.url().should('eq', Cypress.config().baseUrl)
    })

    it('should show counter', () => {
        cy.get('span').contains('0')
        cy.get('button').click()
        cy.get('span').contains('1')
    })
})