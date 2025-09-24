import React from 'react';
import Seo from '../components/common/Seo';

const DisclaimerPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Disclaimer"
        description="Disclaimer for NameNest. The information provided on our website is for general informational purposes only."
        canonicalUrl="https://namenest.in/disclaimer"
      />
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose lg:prose-lg">
          <h1>Disclaimer for NameNest</h1>
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-GB')}</p>

          <p>
            The information provided by NameNest ("we," "us," or "our") on this website is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
          </p>

          <h2>1. Content Accuracy</h2>
          <p>
            The meanings, origins, and other details associated with names are based on historical, cultural, and linguistic research. While we strive for accuracy, this information can be subjective and may vary across different sources. We do not guarantee that all information is completely accurate or up-to-date. Users should use the information as a guide and are encouraged to conduct their own research.
          </p>

          <h2>2. External Links Disclaimer</h2>
          <p>
            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.
          </p>

          <h2>3. No Professional Advice</h2>
          <p>
            The information provided on NameNest is not intended as, and shall not be understood or construed as, professional advice. The information contained on this Site is not a substitute for advice from a professional who is aware of the facts and circumstances of your individual situation. Naming a child is a significant personal decision, and our content should be used as a source of inspiration and information, not as a definitive guide.
          </p>

          <h2>4. Affiliate and AdSense Disclaimer</h2>
          <p>
            This site may contain links to affiliate websites, and we may receive an affiliate commission for any purchases made by you on the affiliate website using such links. We are also a participant in the Google AdSense program, which is an advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Google properties.
          </p>

          <p>
            By using our Site, you hereby consent to our disclaimer and agree to its terms.
          </p>
        </div>
      </div>
    </>
  );
};

export default DisclaimerPage;
