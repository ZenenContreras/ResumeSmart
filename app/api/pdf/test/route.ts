import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Dynamic import to test if @react-pdf/renderer works
    const { renderToBuffer, Document, Page, Text, View } = await import('@react-pdf/renderer');
    const React = await import('react');

    const TestDoc = React.createElement(Document, {},
      React.createElement(Page, { size: 'A4' },
        React.createElement(View, {},
          React.createElement(Text, {}, 'Test PDF')
        )
      )
    );

    // @ts-ignore - renderToBuffer returns a valid Buffer
    const pdfBuffer = await renderToBuffer(TestDoc);

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error: any) {
    console.error('PDF Test Error:', error);
    return NextResponse.json(
      { error: 'PDF generation failed', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
