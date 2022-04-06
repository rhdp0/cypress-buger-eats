import signupPage from '../pages/SignupPage'
import SignupSpFactory from '../factories/SignupFactory'

describe('Signup', () => {  
    // beforeEach(function() {
    //     cy.fixture('deliver').then(d => {
    //         this.deliver = d
    //     })
    // })

    it('User should be deliver', function() {  

        var deliver = SignupSpFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMsg = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signupPage.modalContentShouldBe(expectedMsg)
    })

    it('Incorrect document', function() {

        var deliver = SignupSpFactory.deliver()

        deliver.cpf = '00000000ABC'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function() {

        var deliver = SignupSpFactory.deliver()

        deliver.email = 'user.email.com'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function() {

        const messages = [
            {field: 'name', output:'É necessário informar o nome'},
            {field: 'cpf', output:'É necessário informar o CPF'},
            {field: 'email', output:'É necessário informar o email'},
            {field: 'postalcode', output:'É necessário informar o CEP'},
            {field: 'number', output:'É necessário informar o número do endereço'},
            {field: 'delivery_method', output:'Selecione o método de entrega'},
            {field: 'cnh', output:'Adicione uma foto da sua CNH'}
        ]

        before(function() {
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(message) {
            it(`${message.field} is required`, function() {
                signupPage.alertMessageShouldBe(message.output)
            })
        })
    })
})