import chai from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import chaiAsPromised from 'chai-as-promised';

const chaiSpies = require('chai-spies');
const chaiEnzyme = require('chai-enzyme');
const jsdom = require('jsdom');

const { window } = new jsdom.JSDOM('', { userAgent: 'node.js' });

global.window = window;
global.document = window.document;
global.navigator = window.navigator;

Enzyme.configure({ adapter: new Adapter() });

chai
  .use(chaiAsPromised)
  .use(chaiSpies)
  .use(chaiEnzyme)
  .should();
