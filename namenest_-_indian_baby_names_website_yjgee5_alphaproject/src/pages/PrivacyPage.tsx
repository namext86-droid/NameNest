import React from 'react';
import Seo from '../components/common/Seo';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read the Privacy Policy for NameNest. Understand how we collect, use, and protect your personal information when you use our website."
        canonicalUrl="https://namenest.in/privacy-policy"
      />
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose lg:prose-lg">
          <h1>Privacy Policy for NameNest</h1>
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-GB')}</p>

          <p>
            Welcome to NameNest ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2>1. Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you use the contact form.</li>
            <li><strong>Usage Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            <li><strong>Local Storage Data:</strong> We use your browser's local storage to save your list of "Favorite" names. This data is stored only on your device and is not transmitted to our servers.</li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Respond to your comments, questions, and provide customer service.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We do not share, sell, rent, or trade your information with third parties for their commercial purposes. We may share information we have collected about you in certain situations, such as with third-party service providers that perform services for us or on our behalf, including data analysis and website hosting.
          </p>

          <h2>4. Advertising and Analytics</h2>
          <p>
            We may use third-party advertising companies, such as Google AdSense, to serve ads when you visit the Site. These companies may use information about your visits to the Site and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.
          </p>

          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@namenest.in">privacy@namenest.in</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
