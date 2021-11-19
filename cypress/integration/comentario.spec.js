/// <reference types="cypress" />

var Chance = require('chance');
var chance = new Chance();

describe('Articles', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    });

    it('Criar um comentario a um artigo', () => {
        cy.get('[href*=editor]').click()
        
        const articleTitle = 'Article Example ' + new Date().getTime()

        cy.get('input[ng-model$=title]').type(articleTitle)
        cy.get('input[ng-model$=description]').type(chance.sentence({words: 3}))
        cy.get('textarea[ng-model$=body]').type(chance.paragraph())
        cy.get('input[ng-model$=tagField]').type('cypress')

        cy.contains('button', 'Publish Article').click()

        const comment = 'Comment Example ' + new Date().getTime()

        cy.get('textarea[ng-model*=commentForm]').type(comment)
        cy.contains('button', 'Post Comment').click()

        cy.get('comment[ng-repeat*=comments]').should('contain', comment)

    });

});