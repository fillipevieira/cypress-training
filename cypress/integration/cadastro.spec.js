/// <reference types="cypress" />

beforeEach(() =>{
    cy.visit('register')
});

describe('Cadastro', () => {
    it('Cadastro com credenciais validas', () => {

        // RouteMatcher -> indetificacao da rota
        // RouteHandler (opcional)-> manipulacao da resposta
        
        // MOCK
        cy.intercept({
            method: 'POST',
            pathname: '/api/users'
        }, {
            statusCode: 200,
            fixture: 'cadastro-sucesso'
        }).as('postUsers')

        // cy.visit('http://demo.realworld.io/#/register')

        cy.get('[ng-model$=username]').type('TesteCypress2')
        cy.get('[ng-model$=email]').type('teste_cypress2@mail.com')
        cy.get('[ng-model$=password]').type('987654321')

        cy.contains('button', 'Sign up').click()
    });

    it('Cadastro de usuario com email ja cadastrado', () => {
        
        // MOCK
        cy.intercept({
            method: 'POST',
            pathname: '/api/users'
        }, {
            statusCode: 422,
            fixture: 'cadastro-email-usado'
        }).as('postUsers')

        // cy.visit('http://demo.realworld.io/#/register')

        cy.get('[ng-model$=username]').type('TesteCypress3')
        cy.get('[ng-model$=email]').type('teste_cypress2@mail.com')
        cy.get('[ng-model$=password]').type('987654321')
        
        cy.contains('button', 'Sign up').click()

        cy.contains('li', 'email has already been taken').should('be.visible')
    });
});