import { NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type = 'cv', title = 'Document', candidateName = 'Candidate', content = '', jobTitle = '', company = '' } = body;

    let docChildren = [];

    // Header with Candidate Name & Job Target
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: candidateName.toUpperCase(),
            bold: true,
            size: 32,
            color: '171513',
            font: 'Arial'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `Target Role: ${jobTitle} | Company: ${company} | Location: UAE`,
            size: 20,
            color: '5145e5',
            bold: true,
            font: 'Arial'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `Generated via AqionHunt AI Tailored Suite · Verified UAE Market Format`,
            size: 16,
            color: '6e665d',
            italics: true,
            font: 'Arial'
          })
        ],
        spacing: { after: 300 }
      })
    );

    // Parse content lines into DOCX paragraphs
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        docChildren.push(new Paragraph({ spacing: { after: 100 } }));
        continue;
      }

      if (trimmed.startsWith('# ')) {
        docChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: trimmed.replace('# ', ''),
                bold: true,
                size: 26,
                color: '171513',
                font: 'Arial'
              })
            ],
            spacing: { before: 200, after: 100 }
          })
        );
      } else if (trimmed.startsWith('## ')) {
        docChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: trimmed.replace('## ', ''),
                bold: true,
                size: 22,
                color: '5145e5',
                font: 'Arial'
              })
            ],
            spacing: { before: 180, after: 80 }
          })
        );
      } else if (trimmed.startsWith('### ')) {
        docChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({
                text: trimmed.replace('### ', ''),
                bold: true,
                size: 20,
                color: '242435',
                font: 'Arial'
              })
            ],
            spacing: { before: 140, after: 60 }
          })
        );
      } else if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        docChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({
                text: trimmed.replace(/^[•\-\*]\s*/, ''),
                size: 20,
                color: '171513',
                font: 'Arial'
              })
            ],
            spacing: { after: 60 }
          })
        );
      } else {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmed,
                size: 20,
                color: '171513',
                font: 'Arial'
              })
            ],
            spacing: { after: 100 }
          })
        );
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: docChildren
        }
      ]
    });

    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${candidateName.replace(/\s+/g, '_')}_${type.toUpperCase()}_Tailored.docx"`
      }
    });
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate DOCX document' },
      { status: 500 }
    );
  }
}
