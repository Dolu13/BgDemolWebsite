"use client";
import {useState} from "react";

export default function ContactForm() {
  const [subject, setSubject] = useState('');
  const email = 'bgdemol@yahoo.fr'; // Remplacez par votre adresse e-mail

  const handleSubscribe = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  return (
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          <div className="pb-12 md:pb-20">

            {/* CTA box */}
            <div className="relative bg-gray-900 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden" data-aos="zoom-y-out">

              {/* Background illustration */}
              <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" aria-hidden="true">
                <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                  {/* ... (SVG code remains unchanged) ... */}
                </svg>
              </div>

              <div className="relative flex flex-col lg:flex-row justify-between items-center">

                {/* CTA content */}
                <div className="text-center lg:text-left lg:max-w-xl">
                  <h3 className="h3 text-white mb-2">Nous contacter :</h3>
                  <p className="text-gray-300 text-lg mb-6">Formulez une demande correcte, une réponse vous sera envoyé dans les plus brefs délais.</p>
                  <select
                      className="form-select text-gray-300 bg-gray-800 block mb-6"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                  >
                  <option value="Demande d'information">Demande d'information</option>
                  <option value="Devis" selected>Devis</option>
                </select>
                  {/* CTA form */}
                  <button
                      className="btn text-white bg-blue-600 hover:bg-blue-700 shadow"
                      onClick={handleSubscribe}
                  >
                    Envoyer
                  </button>
                  {/*<p className="text-sm text-gray-400 mt-3">No spam. You can unsubscribe at any time.</p>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
