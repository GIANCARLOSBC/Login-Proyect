// Seleccionar el botón de descarga
const downloadExcelBtn = document.querySelector('#download-excel-btn');

// Agregar un controlador de eventos para el botón de descarga
downloadExcelBtn.addEventListener('click', () => {
  // Obtener los datos de la tabla
  const table = document.querySelector('#example');
  const tableData = [];
  const headers = [];
  const rows = table.rows;

  // Obtener los encabezados de la tabla
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    const header = table.rows[0].cells[i].innerHTML.toLowerCase();

    if (
      header === 'nombre' ||
      header === 'apellido paterno' ||
      header === 'apellido materno' ||
      header === 'teléfono' ||
      header === 'email' ||
      header === 'run' ||
      header === 'salario' 
    ) {
      headers.push(header);
    }
  }

  // Obtener los datos de la tabla
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowData = {};

    for (let j = 0; j < row.cells.length; j++) {
      const header = headers[j];
      if (header) {
        rowData[header] = row.cells[j].innerHTML;
      }
    }

    tableData.push(rowData);
  }

  // Crear un objeto de hoja de cálculo de Excel
  const worksheet = XLSX.utils.json_to_sheet(tableData);

  // Configurar el estilo de la tabla
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      if (R === 0) {
        // Establecer el estilo de los encabezados de columna
        worksheet[cellRef].s = {
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
          },
          fill: { fgColor: { rgb: '808080' } },
          font: { color: { rgb: 'FFFFFF' } },
        };
      } else {
        // Establecer el estilo de las celdas de datos
        if (C >= 0 && C <= 5) {
          // Aplicar color verde claro a las celdas de nombre a run
          worksheet[cellRef].s = {
            fill: { fgColor: { rgb: 'C6EFCE' } },
            font: { color: { rgb: 'FFFFFF' } },
          };
        } else {
          worksheet[cellRef].s = {
            border: {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' },
            },
          };
        }
      }
    }
  }

    // Establecer el estilo del logo
    const logoImage = new Image();
    logoImage.src = 'img/330227093_1590450604701258_2236707465770943960_n.jpg';
  
    // Insertar el logo en la hoja de cálculo
    const logoRange = XLSX.utils.decode_range(worksheet['!ref']);
    const logoPosition = { r: logoRange.s.r, c: logoRange.s.c };
    const logoCellRef = XLSX.utils.encode_cell(logoPosition);
  
    worksheet[logoCellRef] = { t: 's', v: '' }; // Coloca el texto "Logo" en la celda del logo
    worksheet['!merges'] = [
      {
        s: { r: logoRange.s.r, c: logoRange.s.c },
        e: { r: logoRange.s.r, c: logoRange.e.c },
      },
    ];
    worksheet[logoCellRef].s = {
      // Establece el estilo del logo
      alignment: { horizontal: 'center' },
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '000000' } },
    };
  
    // Ajustar el ancho de las columnas
    const columnWidths = headers.map(() => ({ width: 15 }));
    worksheet['!cols'] = columnWidths;
  
    // Crear un libro de Excel y agregar la hoja de cálculo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
  
    // Descargar el archivo Excel
    XLSX.writeFile(workbook, 'datos.xlsx');
  });
  