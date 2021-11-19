/// <reference types="cypress" />

beforeEach(() =>{
    cy.visit('login')
});

describe('Login', () => {
    it('Fazendo login com credenciais validas', () => {
        // cy.visit("http://demo.realworld.io/#/login")

        cy.get('input[type=email]').type('teste_cypress@mail.com')
        cy.get('input[type=password]').type('123456789')
        cy.contains('button', 'Sign in').click()

        cy.get('[href*=editor]').should('be.visible')

    });

    it('Fazendo login com senha incorreta', () => {
        // cy.visit("http://demo.realworld.io/#/login")

        cy.get('input[type=email]').type('teste_cypress@mail.com')
        cy.get('input[type=password]').type('1234')
        cy.contains('button', 'Sign in').click()

        cy.get('[ng-repeat*=error]').should('be.visible')

    });
});