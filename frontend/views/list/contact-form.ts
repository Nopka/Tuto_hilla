import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from 'Frontend/views/view';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/text-field';

import {Binder, field} from '@hilla/form';
import ContactModel from 'Frontend/generated/com/example/application/data/entity/ContactModel';
import { crmStore } from 'Frontend/stores/app-store';
import { listViewStore } from './list-view-store';

@customElement('contact-form')
export class ContactForm extends View {
  protected binder = new Binder(this, ContactModel);
  render() {
    const { model } = this.binder;
    return html`
      <vaadin-text-field label="Prénom" ${field(model.firstName)}></vaadin-text-field>
      <vaadin-text-field label="Nom" ${field(model.lastName)}></vaadin-text-field>
      <vaadin-text-field label="Email" ${field(model.email)}></vaadin-text-field>
      <vaadin-combo-box label="Status" ${field(model.status)} item-label-path="name" .items=${crmStore.statuses}></vaadin-combo-box>
      <vaadin-combo-box label="Entreprise" ${field(model.company)}  item-label-path="name" .items=${crmStore.companies}> </vaadin-combo-box>

      <div class="flex gap-s">
        <vaadin-button theme="primary">Enregistrer</vaadin-button>
        <vaadin-button theme="error">Supprimer</vaadin-button>
        <vaadin-button theme="tertiary" @click=${listViewStore.cancelEdit}>Annuler</vaadin-button>
      </div>
    `;
  }
  constructor() {
    super();
    this.autorun(() => {
      if (listViewStore.selectedContact) {
        this.binder.read(listViewStore.selectedContact);
      } else {
        this.binder.clear();
      }
    });
  }
}