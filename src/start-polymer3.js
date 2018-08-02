/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// Import statements in Polymer 3.0 can now use package names.
// polymer-element.js now exports PolymerElement instead of Element,
// so no need to change the symbol. 
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

/**
 * Главный элемент формы
 *
 * @class StartPolymer3
 * @extends {PolymerElement}
 */
class StartPolymer3 extends PolymerElement {
  static get properties () {
    return {
      message: {
        type: String,
        value: ''
      },
      pie: {
        type: Boolean,
        value: false,
        observer: 'togglePie'
      },
      loadComplete: {
        type: Boolean,
        value: false
      }
    };
  }

  constructor() {
    // If you override the constructor, always call the 
    // superconstructor first.
    super();
    // Resolve warning about scroll performance 
    // See https://developers.google.com/web/updates/2016/06/passive-event-listeners
    setPassiveTouchGestures(true);
    this.message = `Hello Hacker! Do you want to visit our event? Let try to register on it :)`;
  }

  ready(){
    // If you override ready, always call super.ready() first.
    super.ready();
    // Output the custom element's HTML tag to the browser console.
    // Open your browser's developer tools to view the output.
    console.log(this.tagName);
    this.$.name.focus();
  }
  
  togglePie(){
    if(this.pie && !this.loadComplete) {
      // See https://developers.google.com/web/updates/2017/11/dynamic-import
      import('./lazy-element.js').then((LazyElement) => {
        console.log("LazyElement loaded");
      }).catch((reason) => {
        console.log("LazyElement failed to load", reason);
      });
      this.loadComplete = true;
    }
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        paper-checkbox {
          --paper-checkbox-checked-ink-color: #FFFFFF;
          --paper-checkbox-unchecked-ink-color: #FFFFFF;
        }

        * {
          text-align: center;
        }

        paper-input {
          margin: auto;
          width: 50%;
        }

        paper-button {
          display:block;
          position: relative;
          margin:0 auto;
          width: 200px;
        }
      </style>

      <h1>Agility Hacker Test</h1>
      <p>[[message]]</p>

      <paper-input id="name" label="name">
        <iron-icon icon="user"></iron-icon>
      </paper-input>
      
      <paper-input id="email" label="email">
        <iron-icon icon="mail"</iron-icon>
      </paper-input>

      <paper-input id="password" type="password" label="password">
        <iron-icon icon="password"></iron-icon>
      </paper-input>

      <paper-button raised id="submit" type="submit" label="submit">
        Submit
      </paper-button>

      <!-- 
      <paper-checkbox id="omgpie"
        toggles
        noink
        checked={{pie}}>I like pie.</paper-checkbox>
      <template is="dom-if" if=[[pie]]>
        <lazy-element><p>lazy loading...</p></lazy-element>
      </template>
      -->
    `;
  }
}

// Register the element with the browser.
customElements.define('start-polymer3', StartPolymer3);
