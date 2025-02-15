import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/login';
import CadastroContato from './modules/cadastro-contato';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const cadastroContatoEdita = new CadastroContato('.form-contato-edita');
const cadastroContatoRegistra = new CadastroContato('.form-contato-registra');

login.init();
cadastro.init();
cadastroContatoEdita.init();
cadastroContatoRegistra.init();

// import './assets/css/style.css';