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
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10" id="Contact">
          <div className="pb-12 md:pb-20">

            {/* CTA box */}
            <div className="relative bg-gray-900 rounded-lg py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden" data-aos="zoom-y-out">

              {/* Background illustration */}
              <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block" aria-hidden="true">
                <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                  {/* ... (SVG code remains unchanged) ... */}
                </svg>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-extrabold text-white mb-4">Nous contacter</h3>
              </div>

              <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">

                {/* CTA content */}
                <div className="text-center lg:text-left lg:max-w-md mb-6 lg:mb-0">

                  <p className="text-gray-600 text-lg mb-4">Par mail :</p>
                  <select
                      className="form-select text-gray-800 bg-gray-200 block w-full mb-4 py-2 px-4 rounded-md"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="Demande d'information">Demande d'information</option>
                    <option value="Devis">Devis</option>
                  </select>
                  <div>
                  <label className="remarque">Remarque</label>
                  <input className="hidden" name="remarque"
                         pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                         placeholder="nom@domaine.com" />
                  </div>
                  {/* CTA form */}
                  <button
                      className="btn text-white bg-blue-600 hover:bg-blue-700 shadow-md py-2 px-6 rounded-md"
                      onClick={handleSubscribe}
                  >
                    Envoyer
                  </button>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-16 bg-gray-400 mx-6"></div>

                {/* Contact by telephone */}
                <div className="text-center lg:text-right lg:max-w-md">
                  <p className="text-gray-600 text-lg mb-4">Par téléphone :</p>
                  <p className="text-xl font-bold text-blue-600">+33 .6 75 02 62 12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



  );
}
