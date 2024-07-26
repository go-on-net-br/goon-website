export default function Page() {
  return (
    <>
      <form
        className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:flex-wrap md:items-start"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        name="credenciamento"
      >
        <input type="hidden" name="form-name" value="credenciamento" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <div className="flex h-20 w-full items-end justify-center">
          <div data-netlify-recaptcha="true"></div>
          <input
            type="submit"
            className="btn btn-outline btn-primary btn-lg my-0 w-1/2 py-0"
            value="Enviar"
          />
        </div>
      </form>
      <form
        className="flex flex-col justify-center"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        name="credenciamento"
      >
        <input type="hidden" name="form-name" value="credenciamento" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <div className="flex h-20 w-full items-end justify-center">
          <div data-netlify-recaptcha="true"></div>
          <input
            type="submit"
            className="btn btn-outline btn-primary btn-lg my-0 w-1/2 py-0"
            value="Enviar"
          />
        </div>
      </form>
      <form
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        name="newsletter"
      >
        <input type="hidden" name="form-name" value="newsletter" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        <input
          type="submit"
          className="btn btn-outline my-0 bg-white px-9 py-0 text-primary"
          value="Enviar"
        />
      </form>
    </>
  );
}
