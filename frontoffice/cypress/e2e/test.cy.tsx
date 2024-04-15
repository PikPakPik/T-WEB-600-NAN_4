describe('Just visit e2e test', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should show counter', () => {
        cy.get('span').contains('0')
        cy.get('button').click()
        cy.get('span').contains('1')
    })
})