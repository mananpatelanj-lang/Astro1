
import "../styles/globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="mx-auto max-w-5xl p-6">{children}</main>
        <footer className="mx-auto max-w-5xl p-6 text-xs text-gray-500 border-t mt-10">
          These are general remedies. Please consult professional/knowledgeable astrologers/numerologists on how to use these remedies, keeping in mind factors unique to your birth chart.
        </footer>
      </body>
    </html>
  );
}
