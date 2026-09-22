import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nama = String(body.nama || "").trim();
    const email = String(body.email || "").trim();
    const pesan = String(body.pesan || "").trim();

    // =========================
    // VALIDASI
    // =========================

    if (!nama || !email || !pesan) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    // =========================
    // SIMPAN KE SUPABASE
    // =========================

    const { error: supabaseError } = await supabase
      .from("pesan_kontak")
      .insert({
        nama,
        email,
        pesan,
      });

    if (supabaseError) {
      console.error("SUPABASE ERROR:", supabaseError);

      return NextResponse.json(
        {
          success: false,
          message: `Pesan gagal disimpan ke database: ${supabaseError.message}`,
        },
        { status: 500 }
      );
    }

    // =========================
    // CEK KONFIGURASI RESEND
    // =========================

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY belum tersedia.");

      return NextResponse.json({
        success: true,
        emailSent: false,
        message:
          "Pesan berhasil disimpan ke database, tetapi RESEND_API_KEY belum tersedia.",
      });
    }

    if (!targetEmail) {
      console.error("CONTACT_EMAIL belum tersedia.");

      return NextResponse.json({
        success: true,
        emailSent: false,
        message:
          "Pesan berhasil disimpan ke database, tetapi CONTACT_EMAIL belum tersedia.",
      });
    }

    // =========================
    // KIRIM EMAIL
    // =========================

    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: [targetEmail],
        subject: `Pesan Baru dari ${nama}`,
        replyTo: email,

        html: `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pesan Baru dari Portfolio</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f5;
    font-family: Arial, Helvetica, sans-serif;
    color: #18181b;
  "
>
  <div
    style="
      max-width: 650px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    "
  >

    <!-- HEADER -->
    <div
      style="
        background-color: #18181b;
        padding: 36px 32px;
        text-align: center;
      "
    >
      <div
        style="
          display: inline-block;
          padding: 8px 14px;
          border: 1px solid #3f3f46;
          border-radius: 999px;
          color: #ffffff;
          font-size: 11px;
          letter-spacing: 1.5px;
          margin-bottom: 18px;
        "
      >
        PORTFOLIO CONTACT
      </div>

      <h1
        style="
          margin: 0;
          color: #ffffff;
          font-size: 28px;
          line-height: 1.3;
          font-weight: 700;
        "
      >
        Pesan Baru
      </h1>

      <p
        style="
          margin: 10px 0 0;
          color: #a1a1aa;
          font-size: 14px;
          line-height: 1.6;
        "
      >
        Ada seseorang yang menghubungi portfolio kamu.
      </p>
    </div>

    <!-- CONTENT -->
    <div style="padding: 32px;">

      <!-- INFORMASI PENGIRIM -->
      <div
        style="
          background-color: #fafafa;
          border: 1px solid #e4e4e7;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 28px;
        "
      >

        <p
          style="
            margin: 0 0 7px;
            color: #71717a;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
          "
        >
          Nama
        </p>

        <p
          style="
            margin: 0;
            color: #18181b;
            font-size: 17px;
            font-weight: 600;
          "
        >
          ${nama}
        </p>

        <div
          style="
            height: 1px;
            background-color: #e4e4e7;
            margin: 18px 0;
          "
        ></div>

        <p
          style="
            margin: 0 0 7px;
            color: #71717a;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
          "
        >
          Email
        </p>

        <a
          href="mailto:${email}"
          style="
            color: #18181b;
            font-size: 15px;
            text-decoration: underline;
          "
        >
          ${email}
        </a>

      </div>

      <!-- PESAN -->
      <div>

        <p
          style="
            margin: 0 0 10px;
            color: #71717a;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
          "
        >
          Pesan
        </p>

        <div
          style="
            background-color: #fafafa;
            border-left: 4px solid #18181b;
            border-radius: 8px;
            padding: 20px;
            color: #3f3f46;
            font-size: 15px;
            line-height: 1.8;
            word-break: break-word;
          "
        >
          ${pesan.replace(/\n/g, "<br />")}
        </div>

      </div>

      <!-- BUTTON -->
      <div
        style="
          text-align: center;
          margin-top: 30px;
        "
      >

        <a
          href="mailto:${email}?subject=Re: Pesan dari Portfolio"
          style="
            display: inline-block;
            background-color: #18181b;
            color: #ffffff;
            padding: 13px 26px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
          "
        >
          Balas Pesan
        </a>

      </div>

    </div>

    <!-- FOOTER -->
    <div
      style="
        border-top: 1px solid #e4e4e7;
        padding: 22px 32px;
        text-align: center;
      "
    >

      <p
        style="
          margin: 0;
          color: #a1a1aa;
          font-size: 12px;
          line-height: 1.7;
        "
      >
        Pesan ini dikirim melalui website portfolio.
        <br />
        © 2026 Shintya Portfolio
      </p>

    </div>

  </div>
</body>
</html>
        `,
      });

    // =========================
    // CEK HASIL RESEND
    // =========================

    if (emailError) {
      console.error("RESEND ERROR:", emailError);

      return NextResponse.json({
        success: true,
        emailSent: false,
        message:
          "Pesan berhasil disimpan ke database, tetapi email gagal dikirim.",
      });
    }

    console.log("EMAIL BERHASIL DIKIRIM:", emailData);

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: "Pesan berhasil dikirim.",
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}