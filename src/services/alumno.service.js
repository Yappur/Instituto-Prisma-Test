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
        nombre: "Luis",
        apellido: "Lopez",
        email: "luis@gmail.com",
      },
      {
        nombre: "Maria",
        apellido: "Lopez",
        email: "maria@gmail.com",
        telefono: "3865-113341",
      },
      {
        nombre: "Laura",
        apellido: "Lopez",
        email: "laura@gmail.com",
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

export const ActualizarEmailAlumno = async (
  prisma,
  emailAnterior,
  nuevoEmail,
) => {
  try {
    const alumnoActualizado = await prisma.alumno.update({
      // .update indica para actualizar un parametro

      where: { email: emailAnterior },
      data: { email: nuevoEmail },
    });
    console.log("Email de alumno actualizado", alumnoActualizado);
  } catch (error) {
    if (error.code === "P2025") {
      console.error("Error: No se encontro un alumno con este email");
    } else {
      console.error("Ocurrio un error", error);
    }
  }
};

export const eliminarAlumno = async (prisma, email) => {
  try {
    const alumnoEliminado = await prisma.alumno.delete({
      where: { email: email },
    });
    console.log("Alumno eliminado", alumnoEliminado.nombre + " " + alumnoEliminado.apellido);
  } catch (error) {
    if (error.code === "P2025") {
      console.error("Error: No se encontró un alumno con ese email");
    } else {
      console.error("Ocurrió un error:", error);
    }
  }
};
