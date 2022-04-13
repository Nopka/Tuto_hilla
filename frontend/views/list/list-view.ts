import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import './contact-form';

import { crmStore } from 'Frontend/stores/app-store';
import { listViewStore } from './list-view-store';

@customElement('list-view')
export class ListView extends View {
  render() {
    return html`
      <div class="toolbar flex gap-s">
        <vaadin-text-field placeholder="Filtrer par nom" .value=${listViewStore.filterText} @input=${this.updateFilter} clear-button-visible></vaadin-text-field>
        <vaadin-button @click=${listViewStore.editNew}>Ajouter un contact</vaadin-button>
      </div>
      <div class="content flex gap-m h-full">
        <vaadin-grid class="grid h-full" .items=${listViewStore.filteredContacts} .selectedItems=${[listViewStore.selectedContact]} @active-item-changed=${this.handleGridSelection}>
          <vaadin-grid-column path="firstName" header="Prénom" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Nom" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="email" header="Email" auto-width> </vaadin-grid-column>
          <vaadin-grid-column path="status.name" header="Status" auto-width></vaadin-grid-column>
          <vaadin-grid-column path="company.name" header="Entreprise" auto-width></vaadin-grid-column>
        </vaadin-grid>
        <contact-form
          class="flex flex-col gap-s"
          ?hidden=${!listViewStore.selectedContact}>
        </contact-form>
      </div>
    `;
  }

  updateFilter(e: { target: HTMLInputElement }) {
    listViewStore.updateFilter(e.target.value);
  }

  firstSelectionEvent = true;
  handleGridSelection(e: CustomEvent){
    if (this.firstSelectionEvent) {
      this.firstSelectionEvent = false;
      return;
    }
    listViewStore.setSelectedContact(e.detail.value);
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
    this.autorun(() => {
      if (listViewStore.selectedContact) {
        this.classList.add("editing");
      } else {
        this.classList.remove("editing");
      }

    });
  }
}
