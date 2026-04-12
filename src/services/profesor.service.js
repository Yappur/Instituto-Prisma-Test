// Consulta para dar de alta a un profesor

export const agregarProfesor = async (
  prisma,
  nombre,
  apellido,
  email,
  curso,
) => {
  const cursoExistente = await prisma.curso.findUnique({
    where: { nombre: curso },
  });

  if (!cursoExistente) {
    console.log(`El curso "${curso}" no existe. Crealo primero.`);
    return;
  }

  const actualizarCurso = await prisma.curso.update({
    where: {
      // indicamos el curso que queremos actualizar por nombre
      nombre: curso,
    },
    data: {
      profesor: {
        create: {
          // esta consulta crea un nuevo profesor y lo asigna al curso que le pasamos por parametro
          nombre,
          apellido,
          email,
        },
      },
    },
    include: {
      profesor: true, // incluimos el profesor en la respuesta para ver los datos del profesor agregado
    },
  });
  console.log(
    `Profesor: ${actualizarCurso.profesor.nombre} ${actualizarCurso.profesor.apellido} agregado y asignado al curso: ${actualizarCurso.nombre}`,
  );
};
