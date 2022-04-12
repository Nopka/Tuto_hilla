import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from 'Frontend/views/view';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/text-field';

@customElement('contact-form')
export class ContactForm extends View {
  render() {
    return html`
      <vaadin-text-field label="Prénom"></vaadin-text-field>
      <vaadin-text-field label="Nom"></vaadin-text-field>
      <vaadin-text-field label="Email"></vaadin-text-field>
      <vaadin-combo-box label="Status"></vaadin-combo-box>
      <vaadin-combo-box label="Entreprise"> </vaadin-combo-box>

      <div class="flex gap-s">
        <vaadin-button theme="primary">Enregistrer</vaadin-button>
        <vaadin-button theme="error">Supprimer</vaadin-button>
        <vaadin-button theme="tertiary">Annuler</vaadin-button>
      </div>
    `;
  }
}