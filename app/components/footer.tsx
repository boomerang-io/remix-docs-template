import { siteConfig } from "~/config/site";

export function Footer() {
  return (
    <footer>
      <div className="z-40 w-full py-4 border-slate-900/10 border-y">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-28 sm:px-6 grid grid-cols-2 gap-y-8 gap-x-6 md:grid-cols-5 lg:py-20">
          <div className="col-span-2">
            <div>
              <img src="/backstop-logo.svg" alt="Backstop" className="h-10" />
              <div className="mt-4 text-gray-400">
                <p>© 2024 WalkaboutDev.</p>
                <p>All rights reserved.</p>
              </div>
              <div className="mt-6 flex items-center space-x-6">
                <a
                  href="https://twitter.com/flowabl_io"
                  className="text-gray-500 transition-colors hover:text-gray-600"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="https://join.slack.com/t/boomerang-io/shared_invite/zt-pxo2yw2o-c3~6YvWkKNrKIwhIBAKhaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-gray-600"
                >
                  <span className="sr-only">Slack Community</span>
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 128 128"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317C6.616 94.036.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317-7.33 0-13.317-5.987-13.317-13.317zm0 0"></path>
                    <path d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309C33.964 6.616 39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0"></path>
                    <path d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317 7.33 0 13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0"></path>
                    <path d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309 0 7.33-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317 0 7.33-5.987 13.317-13.317 13.317zm0 0"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <div className="text-slate-500 !tracking-widest text-sm font-medium uppercase">
              Resources
            </div>
            <div>
              <a href="/docs" className="link link-hover !text-gray-500">
                Docs
              </a>
            </div>
            <div>
              <a href="/pricing" className="link link-hover !text-gray-500">
                Pricing
              </a>
            </div>
            {/* <div>
              <a
                href="/alternatives"
                className="link link-hover !text-gray-500"
              >
                Alternatives
              </a>
            </div> */}
            <div>
              <a href="/community" className="link link-hover !text-gray-500">
                Open Source
              </a>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <div className="text-slate-500 !tracking-widest text-sm font-medium uppercase">
              Company
            </div>
            <div>
              <a href="/legal/terms" className="link link-hover !text-gray-500">
                Terms of Service
              </a>
            </div>
            <div>
              <a
                href="/legal/privacy"
                className="link link-hover !text-gray-500"
              >
                Privacy Policy
              </a>
            </div>
            <div>
              <a href="/about" className="link link-hover !text-gray-500">
                About
              </a>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <div className="text-slate-500 !tracking-widest text-sm font-medium uppercase">
              Care
            </div>
            <div>
              <a href="/support" className="link link-hover !text-gray-500">
                Support
              </a>
            </div>
            <div>
              <a href="/contact" className="link link-hover !text-gray-500">
                Contact
              </a>
            </div>
            {/* <div>
              <a href="/status" className="link link-hover !text-gray-500">
                Status
              </a>
            </div> */}
          </div>
        </div>
        {/* <div className="absolute bottom-0 right-0">
              <a
                target="_blank"
                rel="noopener"
                href="https://betteruptime.com/"
              >
                <img
                  style={{ width: "130px", height: "52px" }}
                  alt="Better Uptime Website Monitoring"
                  src="https://betteruptime.com/assets/static_assets/badges/light.png"
                />
              </a>
            </div> */}
      </div>
    </footer>
  );
}
