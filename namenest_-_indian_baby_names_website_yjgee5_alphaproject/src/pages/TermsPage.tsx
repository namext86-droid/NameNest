import React from 'react';
import Seo from '../components/common/Seo';

const TermsPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Read the Terms of Service for NameNest. By using our website, you agree to these terms and conditions."
        canonicalUrl="https://namenest.in/terms"
      />
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose lg:prose-lg">
          <h1>Terms of Service for NameNest</h1>
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-GB')}</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using NameNest (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Site.
          </p>

          <h2>2. Use of the Site</h2>
          <p>
            NameNest provides a database of baby names, meanings, and related content for personal, non-commercial use only. You agree not to use the Site for any unlawful purpose or in any way that could harm the Site or its users.
          </p>
          <ul>
            <li>You may not scrape, copy, or redistribute the content of the Site without our express written permission.</li>
            <li>The content provided is for informational purposes only. While we strive for accuracy, we do not guarantee the correctness or completeness of any information on the Site.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos, and software, is the property of NameNest or its content suppliers and is protected by international copyright laws.
          </p>

          <h2>4. User-Generated Content</h2>
          <p>
            If you submit comments or other content to the Site, you grant us a non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, and publish such content.
          </p>

          <h2>5. Disclaimers and Limitation of Liability</h2>
          <p>
            The Site is provided on an "as is" and "as available" basis. NameNest makes no representations or warranties of any kind, express or implied, as to the operation of the Site or the information, content, or materials included on the Site. You expressly agree that your use of the Site is at your sole risk.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will post the revised Terms on this page and update the "Last Updated" date. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:legal@namenest.in">legal@namenest.in</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
