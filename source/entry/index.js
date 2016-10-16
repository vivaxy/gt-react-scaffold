/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import React, { Component } from 'react';
import render, { renderWithEntry } from '../library/render';
import Index from '../container/Index';

render(Index);

if (module.hot) {
    module.hot.accept(`../container/Demo`, () => {
        const NewEntry = require(`../container/Index`).default;
        renderWithEntry(NewEntry);
    });
}
