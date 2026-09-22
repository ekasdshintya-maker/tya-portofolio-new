import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

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
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    // =========================
    // CEK ENV SUPABASE
    // =========================

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variable belum tersedia.");

      return NextResponse.json(
        {
          success: false,
          message: "Konfigurasi Supabase belum tersedia di server.",
        },
        { status: 500 }
      );
    }

    // Buat Supabase client setelah environment tersedia
    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    // =========================
    // SIMPAN PESAN KE SUPABASE
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
          message: "Pesan gagal disimpan ke database.",
        },
        { status: 500 }
      );
    }

    // =========================
    // CEK ENV RESEND
    // =========================

    const resendApiKey = process.env.RESEND_API_KEY;
    const targetEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !targetEmail) {
      console.error(
        "RESEND_API_KEY atau CONTACT_EMAIL belum tersedia."
      );

      return NextResponse.json({
        success: true,
        emailSent: false,
        message:
          "Pesan berhasil disimpan ke database, tetapi email belum dikonfigurasi.",
      });
    }

    // =========================
    // KIRIM EMAIL
    // =========================

    const resend = new Resend(resendApiKey);

    const { error: emailError } =
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: [targetEmail],
        subject: `Pesan baru dari ${nama}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Pesan Baru dari Portfolio</h2>

            <p>
              <strong>Nama:</strong><br />
              ${nama}
            </p>

            <p>
              <strong>Email:</strong><br />
              ${email}
            </p>

            <p>
              <strong>Pesan:</strong><br />
              ${pesan.replace(/\n/g, "<br />")}
            </p>

            <hr />

            <p style="color: #777;">
              Pesan ini dikirim dari website portfolio.
            </p>
          </div>
        `,
      });

    if (emailError) {
      console.error("RESEND ERROR:", emailError);

      return NextResponse.json({
        success: true,
        emailSent: false,
        message:
          "Pesan berhasil disimpan ke database, tetapi email gagal dikirim.",
      });
    }

    // =========================
    // BERHASIL
    // =========================

    return NextResponse.json({
      success: true,
      emailSent: true,
      message:
        "Pesan berhasil disimpan dan email berhasil dikirim.",
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