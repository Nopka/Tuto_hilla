import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import './contact-form'; // import of our custom component


@customElement('list-view')
export class ListView extends View {
  render() {
    return html`
      <div class="toolbar flex gap-s">
        <vaadin-text-field placeholder="Filtrer par nom" clear-button-visible></vaadin-text-field>
        <vaadin-button>Ajouter un contact</vaadin-button>
      </div>
      <div class="content flex gap-m h-full">
        <vaadin-grid class="grid h-full">
          <vaadin-grid-column path="firstName" header="Prénom" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Nom" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="email" header="Email" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="status.name" header="Status" auto-width></vaadin-grid-column>
          <vaadin-grid-column path="company.name" header="Entreprise" auto-width></vaadin-grid-column>
        </vaadin-grid>
        <contact-form class="flex flex-col gap-s"></contact-form>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add(
      'box-border',
      'flex',
      'flex-col',
      'p-m',
      'gap-s',
      'w-full',
      'h-full'
    );
  }
}
