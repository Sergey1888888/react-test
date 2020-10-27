import React from 'react';
import {create} from "react-test-renderer";
import Paginator from './Paginator';

describe("Paginator tests", () => {
    test('should display 5 <span> when totalItemsCount=6', () => {
        let component = create(<Paginator totalItemsCount={6} pageSize={5} currentPage={1} />)
        let root = component.root;
        let spans = root.findAllByType("span");
        expect(spans.length).toBe(5);
    })
    
})