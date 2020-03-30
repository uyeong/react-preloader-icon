import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());
