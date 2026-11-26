import { Component } from '@angular/core';
import { LegalPageComponent, LegalSection } from './legal-page.component';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [LegalPageComponent],
  template: `
    <app-legal-page
      title="Terms of Service"
      shortName="agreement"
      eyebrow="Legal"
      intro="These Terms of Service govern your use of codixytechnologies.com and set out the general terms on which CODIXY Technologies provides software development, design and technology services."
      description="Read the Terms of Service for CODIXY Technologies, covering website use, project engagements, payments, intellectual property, confidentiality and liability."
      path="/terms-of-service"
      lastUpdated="26 November 2026"
      otherLink="/privacy-policy"
      otherLabel="Read Privacy Policy"
      [sections]="sections">
    </app-legal-page>
  `,
})
export class TermsOfServiceComponent {
  sections: LegalSection[] = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      html: `
        <p>These Terms of Service (<strong>"Terms"</strong>) form an agreement between you and CODIXY Technologies (<strong>"CODIXY"</strong>, <strong>"we"</strong>, <strong>"us"</strong> or <strong>"our"</strong>), an IT solutions company based in Hyderabad, Telangana, India.</p>
        <p>By accessing <a href="https://codixytechnologies.com">codixytechnologies.com</a> (the <strong>"Website"</strong>) or engaging our services, you agree to be bound by these Terms and our <a href="/privacy-policy">Privacy Policy</a>. If you do not agree, please do not use the Website or our services.</p>
        <p>If you are accepting these Terms on behalf of a company or organisation, you confirm that you have the authority to bind it.</p>
      `,
    },
    {
      id: 'our-services',
      title: 'Our Services',
      html: `
        <p>CODIXY provides technology services to businesses, including:</p>
        <ul>
          <li>AI and intelligent automation;</li>
          <li>web application development;</li>
          <li>mobile app development;</li>
          <li>enterprise software;</li>
          <li>UI/UX design and branding; and</li>
          <li>DevOps, cloud and ongoing maintenance and support.</li>
        </ul>
        <p>The specific scope, deliverables, timelines and fees for each engagement are set out in a separate proposal, quotation, statement of work or service agreement (each a <strong>"Project Agreement"</strong>). If a Project Agreement conflicts with these Terms, the Project Agreement prevails for that project.</p>
      `,
    },
    {
      id: 'website-use',
      title: 'Use of the Website',
      html: `
        <p>You may use the Website for lawful purposes only. You agree not to:</p>
        <ul>
          <li>use the Website in any way that breaches applicable laws or regulations;</li>
          <li>attempt to gain unauthorised access to the Website, its servers or related systems;</li>
          <li>introduce viruses, malware or any harmful code, or disrupt the Website's operation;</li>
          <li>scrape, copy or harvest content or data from the Website by automated means without our permission;</li>
          <li>submit false, misleading or spam enquiries through our contact form or chat; or</li>
          <li>impersonate CODIXY, our team members or any other person.</li>
        </ul>
        <p>We may suspend or restrict access to the Website at any time to protect its security or for maintenance.</p>
      `,
    },
    {
      id: 'website-content',
      title: 'Website Content',
      html: `
        <p>The information on the Website, including service descriptions, portfolio items, statistics and testimonials, is provided for general information about our company. While we work to keep it accurate and up to date, it does not constitute a binding offer and may change without notice.</p>
        <p>Any estimates, prices or timelines discussed through the Website, chat assistant, email or WhatsApp are indicative only until confirmed in a Project Agreement.</p>
      `,
    },
    {
      id: 'project-engagements',
      title: 'Project Engagements',
      html: `
        <ul>
          <li><strong>Proposals:</strong> unless stated otherwise, quotations are valid for 30 days from the date of issue.</li>
          <li><strong>Scope changes:</strong> work outside the agreed scope is treated as a change request and may affect cost and timelines. We will confirm any change with you in writing before proceeding.</li>
          <li><strong>Timelines:</strong> delivery dates are good-faith estimates and depend on timely feedback, approvals, content and access from you.</li>
          <li><strong>Acceptance:</strong> deliverables are reviewed against the agreed requirements. If no feedback is received within the review period set in the Project Agreement (or 10 business days if none is stated), the deliverable is deemed accepted.</li>
          <li><strong>Support:</strong> post-launch maintenance, hosting and support are provided only as set out in a Project Agreement or separate support plan.</li>
        </ul>
      `,
    },
    {
      id: 'payments',
      title: 'Fees & Payments',
      html: `
        <ul>
          <li>Fees, milestones and payment schedules are defined in each Project Agreement. Projects may require an advance payment before work begins.</li>
          <li>Invoices are payable within the period stated on the invoice. All amounts are exclusive of GST and other applicable taxes, which will be charged as required by law.</li>
          <li>We may pause work or withhold deliverables if payments are overdue, after giving you reasonable notice.</li>
          <li>Third-party costs such as domains, hosting, cloud services, paid APIs, licences and app-store fees are your responsibility unless expressly included in the Project Agreement.</li>
          <li>Advance payments are non-refundable for work already performed or resources already committed.</li>
        </ul>
      `,
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      html: `
        <h3>Website content</h3>
        <p>All content on the Website, including the CODIXY name, logo, text, graphics, designs and code, is owned by or licensed to CODIXY and protected by intellectual property laws. You may not copy, reproduce or reuse it without our prior written consent.</p>
        <h3>Client deliverables</h3>
        <p>Upon <strong>full payment</strong> of all fees for a project, ownership of the custom deliverables created specifically for you (such as source code, designs and documentation) transfers to you, unless the Project Agreement states otherwise.</p>
        <ul>
          <li>CODIXY retains ownership of its pre-existing tools, frameworks, libraries, components and know-how, and grants you a non-exclusive, perpetual licence to use them as part of your deliverables.</li>
          <li>Open-source and third-party components remain subject to their own licence terms.</li>
          <li>Unless you ask us not to, or an NDA prohibits it, we may mention you as a client and showcase non-confidential aspects of the work in our portfolio.</li>
        </ul>
      `,
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      html: `
        <p>Both parties agree to keep confidential any non-public business, technical or financial information received from the other party, and to use it only for the purposes of the engagement. This obligation continues after the engagement ends.</p>
        <p>This does not apply to information that is publicly available, already known to the receiving party, independently developed, or required to be disclosed by law. We are happy to sign a separate Non-Disclosure Agreement (NDA) before discussing your project.</p>
      `,
    },
    {
      id: 'client-responsibilities',
      title: 'Client Responsibilities',
      html: `
        <p>To help us deliver successfully, you agree to:</p>
        <ul>
          <li>provide accurate requirements, timely feedback and a point of contact for decisions;</li>
          <li>supply content, data, credentials and third-party access needed for the project;</li>
          <li>ensure you have the rights to any materials you provide, and that they do not infringe anyone else's rights; and</li>
          <li>comply with applicable laws, including data-protection laws, for any personal data you ask us to process.</li>
        </ul>
      `,
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      html: `
        <p>Our solutions and the Website may integrate with or link to third-party services such as cloud platforms, payment gateways, AI models, maps, messaging and social media platforms. These services are governed by their own terms and privacy policies. We are not responsible for their availability, performance, pricing changes or content.</p>
      `,
    },
    {
      id: 'warranties',
      title: 'Disclaimer of Warranties',
      html: `
        <p>The Website is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis. To the fullest extent permitted by law, we make no warranties, express or implied, that the Website will be uninterrupted, error-free or free of harmful components.</p>
        <p>For project work, we will perform services with reasonable skill and care in line with industry standards. Any specific warranty period for defects will be set out in the Project Agreement.</p>
      `,
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      html: `
        <p>To the maximum extent permitted by law, CODIXY will not be liable for any indirect, incidental, special or consequential damages, or for any loss of profits, revenue, data or business opportunities arising from your use of the Website or our services.</p>
        <p>Our total liability for any claim relating to a project is limited to the fees you paid to us for that project in the <strong>12 months</strong> before the event giving rise to the claim. Nothing in these Terms limits liability that cannot be limited under applicable law.</p>
      `,
    },
    {
      id: 'indemnity',
      title: 'Indemnification',
      html: `
        <p>You agree to indemnify and hold harmless CODIXY, its founders, employees and partners from any claims, losses or expenses (including reasonable legal fees) arising from your breach of these Terms, your misuse of the Website, or materials you provide that infringe the rights of a third party.</p>
      `,
    },
    {
      id: 'termination',
      title: 'Termination',
      html: `
        <p>Either party may end a project engagement as set out in the Project Agreement. Unless agreed otherwise, you will pay for all work completed and costs incurred up to the termination date, and we will hand over completed deliverables for which payment has been received.</p>
        <p>We may suspend or terminate your access to the Website if you breach these Terms. Sections relating to intellectual property, confidentiality, liability and governing law survive termination.</p>
      `,
    },
    {
      id: 'governing-law',
      title: 'Governing Law & Disputes',
      html: `
        <p>These Terms are governed by the laws of India. We encourage you to contact us first so we can try to resolve any concern amicably. If a dispute cannot be resolved through good-faith discussion within 30 days, it will be subject to the exclusive jurisdiction of the courts in <strong>Hyderabad, Telangana</strong>.</p>
      `,
    },
    {
      id: 'changes',
      title: 'Changes to These Terms',
      html: `
        <p>We may revise these Terms from time to time. The updated version will be posted on this page with a new "Last updated" date. Your continued use of the Website after changes are posted means you accept the revised Terms. Changes do not affect Project Agreements already signed.</p>
      `,
    },
    {
      id: 'contact',
      title: 'Contact Us',
      html: `
        <p>If you have any questions about these Terms, please get in touch:</p>
        <ul>
          <li><strong>Company:</strong> CODIXY Technologies</li>
          <li><strong>Email:</strong> <a href="mailto:connect@codixytechnologies.com">connect@codixytechnologies.com</a></li>
          <li><strong>Phone:</strong> <a href="tel:+916300358759">+91 6300358759</a></li>
          <li><strong>Address:</strong> Hyderabad, Telangana, India</li>
        </ul>
      `,
    },
  ];
}
