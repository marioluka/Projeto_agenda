import validator from 'validator';

export default class CadastroContato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validade(e);
        });
    }

    validade(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            alert('E-mail inválido');
            error = true;
        }

        if (telefoneInput.value.length < 8 || telefoneInput.value.length > 15) {
            alert('Telefone precisa ter entre 8 e 15 caracteres');
            error = true;
        }

        if (!error) el.submit();
    }
}