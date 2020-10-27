import React from 'react';
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {
    test('status from props should be in the local state', () => {
        const component = create(<ProfileStatus status="Hello" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Hello");
    })
    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status="Hello" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeUndefined();
    })
    test(`after creation <input> shouldn't be displayed`, () => {
        const component = create(<ProfileStatus status="Hello" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    })
    test('<span> should display correct status', () => {
        const component = create(<ProfileStatus status="Hello" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("Hello");
    })
    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Hello" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })
    test('<input> should be displayed after doubleclicking on <span>', () => {
        const component = create(<ProfileStatus status="Hello" />);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        expect(input).not.toBeUndefined();
    })
})