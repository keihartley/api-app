import { shallow } from "enzyme";

export const testSnapshot = (Component) => {
    it("matches snapshot", () => {
        const wrapper = shallow(<Component />);
        expect(wrapper).toMatchSnapshot();
    });
};

export const testRendering = (Component, props) => {
    it("renders correctly", () => {
        const wrapper = shallow(<Component {...props} />);
        expect(wrapper.exists()).toBe(true);
    });
};

export const testProps = (Component, props) => {
    it("renders with correct props", () => {
        const wrapper = shallow(<Component {...props} />);
        Object.keys(props).forEach((key) => {
            expect(wrapper.prop(key)).toEqual(props[key]);
        });
    });
};