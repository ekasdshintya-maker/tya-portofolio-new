import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nama = String(body.nama || "").trim();
    const email = String(body.email || "").trim();
    const pesan = String(body.pesan || "").trim();

    if (!nama || !email || !pesan) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama, email, dan pesan wajib diisi.",
        },
        { status: 400 }
      );
    }

    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format email tidak valid.",
        },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY belum tersedia.");

      return NextResponse.json(
        {
          success: false,
          message: "Konfigurasi email belum tersedia.",
        },
        { status: 500 }
      );
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error("ADMIN_EMAIL belum tersedia.");

      return NextResponse.json(
        {
          success: false,
          message: "Email admin belum dikonfigurasi.",
        },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Shintya <onboarding@resend.dev>",

      // Email admin
      to: [process.env.ADMIN_EMAIL],

      // Ketika admin menekan Reply,
      // balasan diarahkan ke email pengunjung.
      replyTo: email,

      subject: `Pesan Portfolio dari ${nama}`,

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Pesan Portfolio</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 30px;
              background: #080808;
              font-family: Arial, sans-serif;
              color: #222;
            "
          >

            <div
              style="
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                border-radius: 16px;
                padding: 30px;
              "
            >

              <h2
                style="
                  margin-top: 0;
                  color: #c026d3;
                "
              >
                Pesan Baru dari Portfolio Shintya
              </h2>

              <hr
                style="
                  border: none;
                  border-top: 1px solid #eeeeee;
                  margin: 20px 0;
                "
              />

              <p>
                <strong>Nama</strong>
              </p>

              <p>
                ${escapeHtml(nama)}
              </p>

              <p>
                <strong>Email</strong>
              </p>

              <p>
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Pesan</strong>
              </p>

              <div
                style="
                  background: #f7f7f7;
                  border-radius: 10px;
                  padding: 15px;
                  line-height: 1.6;
                "
              >
                ${escapeHtml(pesan).replace(/\n/g, "<br />")}
              </div>

              <hr
                style="
                  border: none;
                  border-top: 1px solid #eeeeee;
                  margin: 20px 0;
                "
              />

              <p
                style="
                  font-size: 13px;
                  color: #777;
                "
              >
                Email ini dikirim melalui contact form
                Portfolio Shintya.
              </p>

            </div>

          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Pesan gagal dikirim. Silakan coba lagi.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim ke admin.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}

/**
 * Mencegah HTML dari input user
 * masuk langsung ke email.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}