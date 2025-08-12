import { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";

const API_BASE_URL = import.meta.env.VITE_SERVER_HOST;

const baseUrl = API_BASE_URL;

const Docs = () => {

  useEffect(() => {
    const scrollEl = document.querySelector(".docs-nav-content");
    if (scrollEl) {
      // Bootstrap 5 ScrollSpy init
      const scrollSpy = new bootstrap.ScrollSpy(scrollEl, {
        target: "#docs-nav",
        offset: 130, // Adjust based on your header height
      });

      // Refresh in case dynamic content was loaded
      scrollSpy.refresh?.();
    }
  }, []);

  const [copySuccess, setCopySuccess] = useState({ content: '', id: '' });

  const copyToClipBoard = (code) => {
    navigator.clipboard.writeText(code.content)
      .then(() => {
        setCopySuccess(code);
        setTimeout(() => {
          setCopySuccess({ content: '', id: '' });
        }, 3000)
      })
      .catch(() => setCopySuccess(code));
  };

  const authorizationHeaderSnippet = { content: 'Authorization: Bearer <your-key>', id: 'authorization' };

  const endpointList = [
    {
      title: "All",
      content: "",
      urls: [
        `${baseUrl}/api/countries/all`
      ]
    },
    {
      title: "NAME",
      content: "Search by country name. If you want to get an exact match, use the next endpoint. It can be the common or official value",
      urls: [
        `${baseUrl}/api/countries/name/{name}`,
        `${baseUrl}/api/countries/name/Sri Lanka`,
        `${baseUrl}/api/countries/name/India`,
      ]
    },
    {
      title: "Full Name",
      content: "Search by country’s full name. It can be the common or official value",
      urls: [
        `${baseUrl}/api/countries/fullName/{name}`,
        `${baseUrl}/api/countries/fullName/Sri Lanka`,
      ]
    },
    {
      title: "Code",
      content: "Search by cca2, ccn3, cca3 or cioc country code (yes, any!)",
      urls: [
        `${baseUrl}/api/countries/alpha/{code}`,
        `${baseUrl}/api/countries/alpha/co`,
        `${baseUrl}/api/countries/alpha/170`,
      ]
    },
    {
      title: "Currency",
      content: "Search by currency code or name",
      urls: [
        `${baseUrl}/api/countries/currency/{currency}`,
        `${baseUrl}/api/countries/currency/cop`,
      ]
    },
    {
      title: "Language",
      content: "Search by language code or name",
      urls: [
        `${baseUrl}/api/countries/lang/{language}`,
        `${baseUrl}/api/countries/lang/spanish`,
      ]
    },
    {
      title: "Capital city",
      content: "Search by capital city",
      urls: [
        `${baseUrl}/api/countries/capital/{capital}`,
        `${baseUrl}/api/countries/capital/tallinn`,
      ]
    }
  ];

  return (
    <>
      <div className="container-fluid row docs-main-container">
        <div className="col-md-3 docs-sidebar-nav d-none d-md-block ">
          <nav id="docs-nav" className="bg-light flex-column">
            <a className="nav-link" href="#overview">Overview</a>
            <a className="nav-link" href="#auth">Authentication</a>
            <a className="nav-link" href="#endpoint">Available Endpoints</a>
            <a className="nav-link" href="#example">Example Request</a>
            <a className="nav-link" href="#response">Response Format</a>
            <a className="nav-link" href="#errors">Error Handling</a>
            <a className="nav-link" href="#faq">FAQ</a>
          </nav>
        </div>

        <div className="col-md-9 ms-sm-auto px-3 py-1 docs-nav-content" data-bs-spy="scroll" data-bs-target="#docs-nav" data-bs-smooth-scroll="true">
          <section id="overview" className="mb-5">
            <h2 className="mb-3">Overview</h2>
            <p>
              This API provides a middleware service that offers secure and efficient access to RestCountries data, allowing developers to easily retrieve essential information about countries worldwide. The API is designed to be simple, reliable, and fast, making it an ideal choice for applications that need country-specific data.
            </p>

            <p>
              With this service, you can retrieve information such as country names, capitals, currencies, languages, flags, and more. Whether you're building an international application, a travel website, or just need country data for analysis, this API has got you covered.
            </p>

            <h4>Key Features</h4>

            <ul className="">
              <li><strong>Fast Response Time: </strong>The API returns country data very fast!</li>
              <li><strong>Comprehensive Data: </strong>Access country information like name, currency, capital, language and the flag.</li>
              <li><strong>Simple to use: </strong>With clear documentation and straightforward endpoints, integrating the API into your application is a breeze.</li>
            </ul>

          </section>

          <section id="auth" className="mb-5">
            <h2>Authentication</h2>
            Use your API key in the request header:
            <br />
            <div className="code-block-container d-flex mt-3">
              <div className="code-block rounded-start-3">
                <code>{authorizationHeaderSnippet.content}</code>
              </div>
              <button className="copy-btn rounded-end" onClick={() => copyToClipBoard(authorizationHeaderSnippet)}>
                {copySuccess.id == "authorization" ? (<i className="bi bi-check-lg"></i>) : (<i className="bi bi-copy"></i>)}
              </button>
            </div>
          </section>

          <section id="endpoint" className="mb-5">
            <h2>Available Endpoints</h2>
            <p>Below are the API endpoints available for you.</p>

            <div className="endpoint-parent-container container">
              <div className="endpoint-container row">
                {endpointList ? (
                  endpointList.map((row) => (
                    <>
                      <div className="endpoint-title col-md-6 flex flex-column py-4">
                        <h5>{row?.title || 'No Title'}</h5>
                        <p className="" style={{fontSize: '.9rem'}}>{row?.content || ''}</p>
                      </div>
                      <div className="endpoint-urls col-md-6 flex flex-column justify-content-center align-content-center" style={{backgroundColor: 'var(--gray-light)'}}>
                        {row.urls ? (
                          row.urls.map((url, index) => (
                            <p key={index} className="text-wrap" style={{fontSize: '.75rem'}}>{url}</p>
                          ))
                        ) : null}
                      </div>
                      <hr />
                    </>
                  ))
                ) : (
                  <p>No Endpoint Records</p>
                )}
              </div>
            </div>
          </section>

          <section id="example" className="mb-5">
            <h2>Example Request</h2>
            {/* <pre><code>curl -X GET http://localhost:3000/api/countries -H "Authorization: Bearer YOUR_API_KEY"</code></pre> */}
          </section>

          <section id="response" className="mb-4">
            <h2>Response Format</h2>
            <pre>{`
            [
              {
                "name": "Canada",
                "capital": "Ottawa",
                "currencies": ["CAD"],
                "languages": ["English", "French"],
                "flag": "🇨🇦"
              }
            ]
            `}</pre>
          </section>

          <section id="errors" className="mb-5">
            <h2>Error Handling</h2>
            <ul>
              <li>401 – Unauthorized</li>
              <li>403 – Forbidden</li>
              <li>429 – Too Many Requests</li>
              <li>500 – Server Error</li>
            </ul>
          </section>

          <section id="faq" className="mb-5">
            <h2>FAQ</h2>
            <p><strong>Q:</strong> Can I regenerate my API key?</p>
            <p><strong>A:</strong> Yes, go to your dashboard and click delete + generate again.</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Docs;
