import { Component } from '@angular/core';
import { LegalPageComponent, LegalSection } from './legal-page.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [LegalPageComponent],
  template: `
    <app-legal-page
      title="Privacy Policy"
      shortName="policy"
      eyebrow="Legal"
      intro="Your privacy matters to us. This policy explains what information CODIXY Technologies collects when you visit codixytechnologies.com or work with us, how we use it, and the choices and rights you have."
      description="Learn how CODIXY Technologies collects, uses and protects your personal information when you visit our website or engage our software development services."
      path="/privacy-policy"
      lastUpdated="26 November 2026"
      otherLink="/terms-of-service"
      otherLabel="Read Terms of Service"
      [sections]="sections">
    </app-legal-page>
  `,
})
export class PrivacyPolicyComponent {
  sections: LegalSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      html: `
        <p>CODIXY Technologies (<strong>"CODIXY"</strong>, <strong>"we"</strong>, <strong>"us"</strong> or <strong>"our"</strong>) is an IT solutions company based in Hyderabad, Telangana, India. We build AI-powered automation, web and mobile applications, enterprise software, UI/UX designs and cloud/DevOps solutions for businesses.</p>
        <p>This Privacy Policy applies to our website <a href="https://codixytechnologies.com">codixytechnologies.com</a> (the <strong>"Website"</strong>) and to personal information we receive when you contact us or engage our services. It is designed to comply with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 of India, and related rules.</p>
        <p>By using the Website or sharing your information with us, you acknowledge that you have read and understood this policy.</p>
      `,
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      html: `
        <h3>Information you provide to us</h3>
        <ul>
          <li><strong>Contact form:</strong> your name, email address, subject and the message you send us through the "Get in Touch" form.</li>
          <li><strong>Direct communication:</strong> details you share when you email us, call us, or message us on WhatsApp, Instagram or Facebook, such as your phone number, company name and project requirements.</li>
          <li><strong>Project information:</strong> business requirements, documents, designs, credentials or data you provide so we can prepare a proposal or deliver a project.</li>
          <li><strong>Career applications:</strong> your CV and related details if you apply for a role with us.</li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li><strong>Technical data:</strong> when you visit the Website, our hosting and content-delivery providers automatically process standard log data such as your IP address, browser type, device type, pages requested and the date and time of access. This is used to deliver the Website securely and to prevent abuse.</li>
          <li><strong>Website analytics:</strong> we use <strong>Cloudflare Web Analytics</strong> to understand overall traffic, such as the number of visits, pages viewed, referring websites, country and device type, and to measure page-load performance. It is privacy-first: it does not use cookies, does not track you across websites, and does not build a profile of you.</li>
          <li><strong>Offline cache:</strong> the Website can be installed as an app and uses a service worker to store website files on your device so it loads faster. These files contain no personal information.</li>
        </ul>
        <p class="legal-note">We do <strong>not</strong> use advertising cookies, cross-site tracking or tracking pixels (such as the Facebook Pixel) on the Website.</p>
      `,
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      html: `
        <p>We use personal information only for clear and legitimate purposes, including to:</p>
        <ul>
          <li>respond to your enquiries and provide quotations, proposals and consultations;</li>
          <li>plan, design, develop, deliver and support the software and services you request;</li>
          <li>send project updates, invoices and service-related communication;</li>
          <li>evaluate job applications;</li>
          <li>keep the Website secure, prevent spam and fraud, and fix technical issues;</li>
          <li>understand how visitors use the Website in aggregate, and improve its content, speed and services; and</li>
          <li>comply with applicable laws, regulations and legal requests.</li>
        </ul>
        <p>We do not use your information for automated decision-making that has legal or similarly significant effects on you.</p>
      `,
    },
    {
      id: 'legal-basis',
      title: 'Consent & Legal Basis',
      html: `
        <p>We process your personal information on the basis of your <strong>consent</strong>, which you give when you submit the contact form, write to us or share project details, and for <strong>legitimate uses</strong> permitted by law, such as performing a contract with you, meeting legal obligations, or responding to an emergency.</p>
        <p>You may withdraw your consent at any time by writing to us at <a href="mailto:connect@codixytechnologies.com">connect@codixytechnologies.com</a>. Withdrawing consent does not affect processing already carried out, but it may mean we can no longer provide some services.</p>
      `,
    },
    {
      id: 'cookies',
      title: 'Cookies & Third-Party Content',
      html: `
        <p>The Website itself does not set marketing or analytics cookies. However, some features load content from trusted third parties, which may collect technical information such as your IP address under their own privacy policies:</p>
        <ul>
          <li><strong>Cloudflare</strong>, which hosts and protects the Website and provides our cookie-free Web Analytics;</li>
          <li><strong>Google Maps</strong>, which shows our location in the contact section;</li>
          <li><strong>Google Fonts</strong> and <strong>Fontshare</strong>, which provide the typefaces used on the Website;</li>
          <li><strong>Technology logos</strong> served from public content-delivery networks; and</li>
          <li><strong>WhatsApp, Instagram and Facebook</strong> (Meta Platforms) when you choose to click our social or chat buttons.</li>
        </ul>
        <p>You can control or block cookies through your browser settings. Blocking third-party content may affect how some parts of the Website display.</p>
      `,
    },
    {
      id: 'sharing',
      title: 'How We Share Information',
      html: `
        <p><strong>We never sell or rent your personal information.</strong> We share it only when necessary, with:</p>
        <ul>
          <li><strong>Service providers</strong> who help us run our business, such as website hosting and content delivery, form processing, email and cloud infrastructure providers. They may only use the data to provide their services to us.</li>
          <li><strong>Technology partners</strong> involved in delivering your project (for example cloud hosting or app-store accounts), only as needed and with your knowledge.</li>
          <li><strong>Authorities</strong> where required by law, court order or government request, or to protect our rights, users or the public.</li>
          <li><strong>A successor entity</strong> in the event of a merger, acquisition or restructuring, subject to this policy.</li>
        </ul>
      `,
    },
    {
      id: 'client-data',
      title: 'Client Project Data',
      html: `
        <p>When we build or maintain software for a client, we may access data belonging to that client or its customers (for example, records in a database we are migrating). In these cases we act on the client's instructions, process the data only to deliver the agreed services, and protect it under the confidentiality and data-protection terms of our project agreement or NDA.</p>
        <p>Individuals whose data is held by one of our clients should contact that client directly to exercise their privacy rights.</p>
      `,
    },
    {
      id: 'retention',
      title: 'Data Retention',
      html: `
        <p>We keep personal information only for as long as it is needed for the purposes described in this policy:</p>
        <ul>
          <li>enquiries that do not lead to a project are typically deleted within <strong>24 months</strong>;</li>
          <li>project and billing records are retained for the duration of our engagement and as required by Indian tax and accounting laws; and</li>
          <li>job applications are retained for up to <strong>12 months</strong> unless you ask us to delete them sooner.</li>
        </ul>
        <p>When information is no longer required, we securely delete or anonymise it.</p>
      `,
    },
    {
      id: 'security',
      title: 'Data Security',
      html: `
        <p>We apply reasonable technical and organisational safeguards to protect your information, including encrypted HTTPS connections, access controls, secure credential handling, and limiting access to team members who need it for their work.</p>
        <p>No method of transmission or storage is completely secure. If we become aware of a personal data breach that affects you, we will notify you and the relevant authorities as required by law.</p>
      `,
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      html: `
        <p>Subject to applicable law, you have the right to:</p>
        <ul>
          <li><strong>Access</strong> a summary of the personal information we hold about you and how it is used;</li>
          <li><strong>Correct or update</strong> inaccurate or incomplete information;</li>
          <li><strong>Erase</strong> your information when it is no longer needed or when you withdraw consent;</li>
          <li><strong>Withdraw consent</strong> at any time;</li>
          <li><strong>Nominate</strong> another person to exercise your rights in the event of death or incapacity; and</li>
          <li><strong>Raise a grievance</strong> with us, and if it is not resolved, with the Data Protection Board of India.</li>
        </ul>
        <p>To exercise any of these rights, email <a href="mailto:connect@codixytechnologies.com">connect@codixytechnologies.com</a>. We may need to verify your identity before acting on your request, and we aim to respond within 30 days.</p>
      `,
    },
    {
      id: 'international',
      title: 'International Transfers',
      html: `
        <p>Some of our service providers (such as cloud hosting, content delivery and email services) may store or process data on servers outside India. Where this happens, we take reasonable steps to ensure your information remains protected in line with this policy and Indian law.</p>
      `,
    },
    {
      id: 'children',
      title: "Children's Privacy",
      html: `
        <p>Our Website and services are intended for businesses and adults. We do not knowingly collect personal information from anyone under 18 years of age. If you believe a child has shared information with us, please contact us and we will delete it promptly.</p>
      `,
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links',
      html: `
        <p>The Website contains links to external websites and platforms, such as our social media pages and client projects. We are not responsible for the privacy practices or content of those sites, and we encourage you to read their privacy policies.</p>
      `,
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      html: `
        <p>We may update this Privacy Policy from time to time to reflect changes in our services or legal requirements. The "Last updated" date at the top of this page shows when it was last revised. Significant changes will be highlighted on the Website.</p>
      `,
    },
    {
      id: 'contact',
      title: 'Contact & Grievance Officer',
      html: `
        <p>If you have any questions, requests or complaints about this policy or how we handle your information, please contact our Grievance Officer:</p>
        <ul>
          <li><strong>Company:</strong> CODIXY Technologies</li>
          <li><strong>Email:</strong> <a href="mailto:connect@codixytechnologies.com">connect@codixytechnologies.com</a></li>
          <li><strong>Phone:</strong> <a href="tel:+916300358759">+91 6300358759</a></li>
          <li><strong>Address:</strong> Hyderabad, Telangana, India</li>
        </ul>
        <p>We will acknowledge your complaint promptly and work to resolve it as quickly as possible.</p>
      `,
    },
  ];
}
