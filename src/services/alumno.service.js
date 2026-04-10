// En los services se trabajan con las operaciones CRUD estilo controladores

export const crearAlumno = async (prisma) => {
  const nuevoAlumno = await prisma.alumno.create({
    data: {
      nombre: "Mateo",
      apellido: "Lopez",
      email: "mateox463@gmail.com",
      telefono: "381-2139481",
    },
  });
  // la propiedad prisma viene configurada de nuestro indexjs y el alumno es de nuestro schema.
  // el alumno tenemos q ponerlo con minuscula
  // el create requiere un objeto con los datos del alumno

  console.log("Alumno creado:", nuevoAlumno);
};

export const crearAlumnos = async (prisma) => {
  const alumnosData = await prisma.alumno.createMany({
    // createMany Sirve para crear muchos
    data: [
      {
        nombre: "Jose",
        apellido: "Lopez",
        email: "jose@gmail.com",
      },
      {
        nombre: "Raul",
        apellido: "Lopez",
        email: "raul@gmail.com",
        telefono: "3865-113341",
      },
    ],
    skipDuplicates: true, // si hay algun error en los datos entonces el programa seguira con skipDuplicates
  });
  console.log("Se inscribieron los siguientes alumnos", alumnosData);
};

export const obtenerAlumnos = async (prisma) => {
  const alumnosConsultados = await prisma.alumno.findMany();
  console.log("Alumnos encontrados:");
  console.table(alumnosConsultados);
};

export const ObtenerDatosAlumnos = async (prisma) => {
  const datosAlumnos = await prisma.alumno.findMany({
    select: {
      nombre: true,
      apellido: true,
      telefono: true,
    },
  }); // Select sirve para obtener datos especificos

  console.log("Datos de alumnos encontrados:");
  console.table(datosAlumnos);
};
