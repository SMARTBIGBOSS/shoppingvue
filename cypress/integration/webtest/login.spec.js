describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Click Login link
    cy.get('[href="#/signin"] > .v-btn__content').click()
  })
  after(() => {
    cy.wait(2000)
  })

  describe('error messages in form', () => {
    it('error messages for incomplete form fields', () => {
      cy.get('form > .v-btn').click()
      cy.get(':nth-child(1) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('E-mail is required')
      cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type('cc.com')
      cy.get(':nth-child(1) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Must be valid e-mail')
      cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .clear().type('c@gmail.com').blur()
      cy.get(':nth-child(1) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .should('not.exist')
      cy.get(':nth-child(2) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Password is required')
      cy.get('.v-input--has-state > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type('1234567890123456789012345678901')
      cy.get(':nth-child(2) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Password must be at most 30 characters long')
      cy.get('.v-input--has-state > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .clear().type('1234567890').blur()
      cy.get(':nth-child(2) > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .should('not.exist')
    })
  })

  describe('Invalid Login', () => {
    it('Wrong Email Address', () => {
      cy.get('#signinCard > .v-card__title').contains('Sign In')
      cy.get('#signinCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('c@c.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('5')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(1)').click()
        })
        cy.get('form > .v-btn').click()
        cy.get('.typo__p').contains('Username or Password Incorrect!')
      })
    })
    it('Wrong Password', () => {
      cy.get('#signinCard > .v-card__title').contains('Sign In')
      cy.get('#signinCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('c@c.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('5')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(1)').click()
        })
        cy.get('form > .v-btn').click()
        cy.get('.typo__p').contains('Username or Password Incorrect!')
      })
    })
  })

  describe('Valid Login', () => {
    afterEach(() => {
      cy.get('[href="#/signout"] > .v-btn__content').click()
      cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > :nth-child(3) > .v-btn__content')
        .click()
      cy.wait(2000)
    })
    it('Login as Customer', () => {
      cy.get('#signinCard > .v-card__title').contains('Sign In')
      cy.get('#signinCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('c@c.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('567')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(1)').click()
        })
        cy.get('form > .v-btn').click()
        // cy.wait(5000)
      })
      cy.url().should('include', '/')
      cy.wait(2000)
    })
    it('Login as Seller', () => {
      cy.get('#signinCard > .v-card__title').contains('Sign In')
      cy.get('#signinCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('s@s.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('567')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(2)').click()
        })
        cy.get('form > .v-btn').click()
        // cy.wait(5000)
      })
      cy.url().should('include', '/seller_home')
      cy.wait(2000)
    })
    it('Login as Administrator', () => {
      cy.get('#signinCard > .v-card__title').contains('Sign In')
      cy.get('#signinCard > .v-card__text').within(() => {
        cy.get('form > :nth-child(1)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('admin@gmail.com')
        })
        cy.get('form > :nth-child(2)').within(() => {
          cy.get('.v-input__control > .v-input__slot > .v-text-field__slot > input').type('567')
        })
        cy.get('.v-input--selection-controls > .v-input__control').within(() => {
          cy.get('.v-input--radio-group__input > :nth-child(3)').click()
        })
        cy.get('form > .v-btn').click()
        // cy.wait(5000)
      })
      cy.url().should('include', '/adminHome')
      cy.wait(2000)
    })
  })
})
