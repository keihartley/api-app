// setupTest.js
import '@testing-library/jest-dom/extend-expect'; //importing this line allows to use the custom jest matchers
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
// configure Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });