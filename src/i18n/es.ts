const es = {
  brand: "Cerrajeros Som la Clau 24h",

  navbar: {
    inicio: "Inicio",
    servicios: "Servicios",
    contacto: "Contacto",
    acceso: "Acceso",
    registro: "Registro",
    solicitar: "Solicitar",
    llamar: "Llamar",
  },

  home: {
    badge: "Cerrajero urgente 24 horas",
    title: "Apertura de puertas y cambio de cerraduras con atención rápida",
    subtitle:
      "Servicio profesional para viviendas, negocios y vehículos. Intervención rápida, atención seria y soluciones de seguridad.",
    coverageText:
      "Trabajamos en toda la provincia de Girona, ofreciendo atención a domicilio tanto en urgencias como en servicios programados.",
    coverageTags: [
      "Girona",
      "Salt",
      "Figueres",
      "Blanes",
      "Olot",
      "Provincia de Girona",
    ],
    directAttention: "Atención directa:",
    callNow: "Llamar ahora",
    viewServices: "Ver servicios",
    urgent24h: "Urgencias 24h",
    urgent24hText: "Disponible cada día para incidencias urgentes.",
    damageFree: "Apertura sin daños",
    damageFreeText:
      "Técnicas profesionales para minimizar daños y resolver rápido.",
    securityTrust: "Seguridad y confianza",
    securityTrustText: "Cambio de cerraduras, bombines y mejora de accesos.",
    needLocksmith: "¿Necesitas un cerrajero ahora?",
    needLocksmithText:
      "Llámanos para consultar disponibilidad o pedir asistencia inmediata.",
    callFull: "Llamar al 667 572 011",

    miniHighlights: {
      urgentNumber: "24h",
      urgentText: "Urgencias",
      damageFreeNumber: "Sin daños",
      damageFreeText: "Aperturas seguras",
      securityNumber: "Seguridad",
      securityText: "Bombines y cerraduras",
    },

    floatingCard: {
      top: "Servicio profesional",
      main: "Aperturas, cambios de cerradura y mejoras de seguridad",
      bottom: "Atención rápida y valoración orientativa",
    },

    stats: {
      urgentNumber: "24/7",
      urgentLabel: "Disponibilidad para urgencias",
      damageFreeNumber: "Sin daños",
      damageFreeLabel: "Aperturas cuidadosas y profesionales",
      securityNumber: "+ Seguridad",
      securityLabel: "Bombines y soluciones reforzadas",
      onlineNumber: "Online",
      onlineLabel: "Valoración aproximada desde la web",
    },

    servicesPreview: {
      eyebrow: "Servicios destacados",
      title: "Lo que más puede ayudarte",
      text: "Aquí tienes algunos de los servicios activos que ya están cargados en la aplicación.",
      urgentBadge: "Urgente",
      defaultServiceDescription: "Servicio profesional de cerrajería",
      viewMore: "Ver más",
      emptyText: "No se han podido cargar los servicios destacados en este momento.",
      viewAll: "Ver todos los servicios",
    },

    trust: {
      eyebrow: "Confianza",
      title: "Atención clara y directa",
      text: "Puedes llamar directamente o revisar los servicios para pedir una valoración aproximada antes de la intervención.",
      items: {
        phone: "Atención inmediata por teléfono",
        services: "Servicios claros y visibles",
        quote: "Valoración orientativa online",
        security: "Opciones de mejora de seguridad",
      },
      card: {
        phoneLabel: "Teléfono directo",
        quickConsultationLabel: "Consulta rápida",
        quickConsultationText: "Explícanos tu caso y te orientamos",
        onlineQuoteLabel: "Valoración online",
        onlineQuoteText: "Selecciona servicios y solicita una estimación",
      },
    },

    cta: {
      requestQuote: "Solicitar valoración",
    },

    errors: {
      loadServices: "No se han podido cargar los servicios",
    },
  },

  servicios: {
    title: "Nuestros servicios",
    subtitle:
      "Selecciona los servicios que necesitas y obtén una valoración aproximada.",
    callText: "Consulta inmediata al",
    loading: "Cargando servicios...",
    emailSubject: "Solicitud de valoración aproximada",

    modal: {
      successTitle: "Operación completada",
      errorTitle: "Se ha producido un error",
      infoTitle: "Información",
      close: "Cerrar",
      emailSuccess: "La valoración se ha enviado correctamente por correo.",
      serviceCreated: "El servicio se ha creado correctamente.",
      serviceUpdated: "El servicio se ha actualizado correctamente.",
    },

    admin: {
      createNewService: "Crear nuevo servicio",
      createButton: "Crear servicio",
      urgent: "Urgente",
      active: "Activo",
      placeholders: {
        nombre: "Nombre",
        descripcion: "Descripción",
        precioBase: "Precio base",
        imagenUrl: "URL de la imagen",
      },
    },

    alerts: {
      loginRequiredToSend: "Debes iniciar sesión para enviar la valoración.",
      selectAtLeastOneService: "Selecciona al menos un servicio.",
      nameRequired: "El nombre es obligatorio",
      invalidBasePrice: "El precio base no es válido",
    },

    errors: {
      loadServices: "No se han podido cargar los servicios",
      loadServicesNow: "No se han podido cargar los servicios en este momento.",
      reorderFailed: "No se ha podido guardar el nuevo orden",
      emailSendFailed: "Ha habido un error al enviar el correo.",
      updateServiceFailed: "No se ha podido actualizar el servicio.",
      createServiceFailed: "No se ha podido crear el servicio.",
      invalidUpdatedService: "Servicio actualizado inválido",
      invalidCreatedService: "Servicio creado inválido",
    },

    quoteMessage: {
      greeting: "Hola, solicito una valoración aproximada.",
      clientData: "Datos del cliente",
      name: "Nombre",
      email: "Correo",
      phone: "Teléfono",
      city: "Municipio",
      address: "Dirección",
      selectedServices: "Servicios seleccionados",
      totalApprox: "Total aproximado",
      important: "Importante",
      importantText:
        "Este importe es orientativo y no es definitivo. Puede variar según la distancia, el desplazamiento, la urgencia y la valoración real del trabajo.",
      additionalInfo: "Información adicional",
      noObservations: "Sin observaciones",
      notAvailable: "No disponible",
      doorsSuffix: "puerta/s",
      firstDoorAt: "1ª a",
      nextDoorsAt: "siguientes a",
    },
  },

  contacto: {
    heroBadge: "Contacto directo",
    heroTitle: "Estamos aquí para ayudarte",
    heroText:
      "Si necesitas una intervención urgente, llámanos directamente. Si tu consulta no es urgente, puedes enviarnos un mensaje con los detalles y te responderemos lo antes posible.",

    urgentTopLine: "Atención inmediata",
    urgentTitle: "¿Servicio urgente?",
    urgentText:
      "Para aperturas, problemas de acceso o incidencias que no pueden esperar, te recomendamos llamar directamente.",
    urgentNote:
      "La llamada directa es la forma más rápida de atender una urgencia.",

    formBadge: "Consulta online",
    formTitle: "¿No es urgente?",
    formSubtitle:
      "Envíanos un mensaje con tu consulta y te responderemos lo antes posible.",

    successBox:
      "Se ha preparado tu mensaje en el correo. Revisa el borrador y envíalo.",
    mailSubject: "Consulta desde la web",

    nombre: "Nombre",
    email: "Email",
    telefono: "Teléfono",
    provincia: "Provincia",
    localidad: "Localidad",
    mensajeLabel: "Mensaje",
    enviar: "Enviar mensaje",

    placeholders: {
      nombre: "Tu nombre",
      email: "tu@email.com",
      telefono: "Tu teléfono",
      provincia: "Provincia",
      localidad: "Localidad",
      mensaje: "Explícanos brevemente qué necesitas",
    },

    infoTitle: "Información de contacto",
    direccion: "Dirección",
    addressValue: "Travessia Santa Eugènia 26",
    emailLabel: "Correo electrónico",
    horario: "Horario",
    schedule: {
      weekdays: "De lunes a viernes",
      weekdaysHours: "09:00h - 19:00h",
      saturday: "Urgencias según disponibilidad",
    },
    noteBox:
      "Para urgencias, la opción más rápida sigue siendo la llamada directa.",
    callNow: "Llamar ahora",
  },

  login: {
    brandBadge: "Mi Portal",

    title: "Acceso",
    email: "Correo electrónico",
    password: "Contraseña",
    submit: "Entrar",

    nombre: "Nombre",
    apellidos: "Apellidos",
    telefono: "Teléfono",
    municipio: "Municipio",
    direccion: "Dirección",

    hero: {
      loginTitle: "Bienvenido de nuevo",
      registerTitle: "Crea tu cuenta",
      loginText:
        "Accede a tu cuenta para gestionar tus datos, solicitudes y trámites.",
      registerText:
        "Regístrate para continuar con tu solicitud de forma rápida, segura y sencilla.",
    },

    features: {
      fastSecure: "Acceso rápido y seguro",
      simpleRequests: "Gestión simple de solicitudes",
      clearProfessional: "Diseño claro y profesional",
    },

    tabs: {
      login: "Iniciar sesión",
      register: "Crear cuenta",
    },

    loginTitle: "Iniciar sesión",
    registerTitle: "Crear usuario",

    loginSubtitle: "Introduce tus credenciales para acceder.",
    registerSubtitle: "Completa tus datos para crear una cuenta.",

    placeholders: {
      loginEmail: "ejemplo@correo.com",
      loginPassword: "Introduce tu contraseña",
      nombre: "Tu nombre",
      apellidos: "Tus apellidos",
      registerEmail: "Tu correo",
      registerPassword: "Crea una contraseña",
      telefono: "Tu teléfono",
      municipio: "Tu municipio",
      direccion: "Tu dirección",
    },

    buttons: {
      login: "Entrar",
      loggingIn: "Entrando...",
      createAccount: "Crear cuenta",
      creatingAccount: "Creando cuenta...",
    },

    acceptPrivacy:
      "Acepto la política de privacidad y el tratamiento de mis datos personales.",

    errors: {
      invalidCredentials: "Correo o contraseña incorrectos.",
      passwordMinLength: "La contraseña debe tener al menos 8 caracteres.",
      createAccountFailed: "No se ha podido crear la cuenta.",
      mustAcceptPrivacy:
        "Debes aceptar la política de privacidad y el tratamiento de datos.",
    },
  },

  registro: {
    title: "Registro",
    nombre: "Nombre",
    apellidos: "Apellidos",
    email: "Correo electrónico",
    password: "Contraseña",
    telefono: "Teléfono",
    direccion: "Dirección",
    municipio: "Municipio",
    submit: "Registrarse",

    pageTitle: "Crear cuenta",
    pageSubtitle: "Regístrate para empezar a utilizar la plataforma",

    placeholders: {
      nombre: "Tu nombre",
      apellidos: "Tus apellidos",
      email: "ejemplo@email.com",
      password: "Crea una contraseña",
      telefono: "Tu teléfono",
      direccion: "Tu dirección",
      municipio: "Tu municipio",
    },

    buttons: {
      create: "Crear cuenta",
      creating: "Creando cuenta...",
    },

    footerText: "¿Ya tienes cuenta?",
    footerLink: "Inicia sesión",

    errors: {
      passwordMinLength: "La contraseña debe tener al menos 8 caracteres.",
      createAccountFailed: "No se ha podido crear la cuenta",
    },
  },

  perfil: {
    loading: "Cargando perfil...",
    title: "Mi perfil",
    subtitle:
      "Gestiona tus datos personales y mantén tu información actualizada.",

    personalDataTitle: "Datos personales",
    securityTitle: "Seguridad",
    securitySubtitle:
      "Cambia la contraseña solo si quieres actualizarla.",

    nombre: "Nombre",
    apellidos: "Apellidos",
    email: "Correo electrónico",
    telefono: "Teléfono",
    direccion: "Dirección",
    municipio: "Municipio",

    newPassword: "Nueva contraseña",
    confirmPassword: "Confirmar contraseña",

    placeholders: {
      nombre: "Nombre",
      apellidos: "Apellidos",
      email: "Correo",
      telefono: "Teléfono",
      direccion: "Dirección",
      municipio: "Municipio",
      newPassword: "Escribe una nueva contraseña",
      confirmPassword: "Repite la nueva contraseña",
    },

    buttons: {
      saving: "Guardando...",
      saveChanges: "Guardar cambios",
    },

    messages: {
      localData: "Mostrando datos guardados localmente.",
      updatedSuccessfully: "Datos actualizados correctamente.",
    },

    errors: {
      loadProfile: "No se ha podido cargar el perfil",
      invalidResponse: "Respuesta inválida",
      userNotIdentified: "No se ha podido identificar al usuario.",
      passwordMismatch: "Las contraseñas no coinciden.",
      passwordMinLength: "La nueva contraseña debe tener al menos 8 caracteres.",
      updateFailed: "No se ha podido actualizar el perfil",
      saveChangesFailed: "No se han podido guardar los cambios.",
    },
  },

  solicitud: {
    title: "Solicitar servicio",
    nombre: "Nombre",
    telefono: "Teléfono",
    direccion: "Dirección",
    servicio: "Servicio",
    detalles: "Detalles",
    submit: "Enviar solicitud",

    pageTitle: "Solicitar servicio",
    pageSubtitle:
      "Selecciona uno o varios servicios y envíanos la solicitud por correo o WhatsApp.",

    noticeTitle: "¿Se trata de una urgencia?",
    noticeText: "Si necesitas atención inmediata, llámanos directamente.",

    servicesTitle: "Selecciona los servicios",
    summaryTitle: "Resumen",
    summaryServices: "Servicios",
    summaryUrgency: "Urgencia",
    noneSelected: "Ninguno seleccionado",
    notSpecified: "No especificado",

    emailSubject: "Nueva solicitud de servicio",
    emailButton: "Enviar por correo",
    whatsappButton: "Enviar por WhatsApp",

    urgencyOptions: ["No urgente", "Urgente", "Muy urgente"],

    availableServices: [
      "Apertura de puertas",
      "Apertura de coches",
      "Cambio de cerraduras",
      "Cajas fuertes",
      "Bombines antibumping",
      "Servicio urgente 24h",
    ],

    placeholders: {
      nombre: "Nombre y apellidos",
      telefono: "Teléfono",
      provincia: "Provincia",
      localidad: "Localidad",
      direccion: "Dirección",
      problema: "Describe el problema",
    },

    validation: {
      nameRequired: "Introduce el nombre.",
      phoneRequired: "Introduce el teléfono.",
      provinceRequired: "Introduce la provincia.",
      cityRequired: "Introduce la localidad.",
      addressRequired: "Introduce la dirección.",
      selectServiceRequired: "Selecciona al menos un servicio.",
      problemRequired: "Describe el problema.",
    },

    requestMessage: {
      title: "Nueva solicitud de servicio",
      name: "Nombre",
      phone: "Teléfono",
      province: "Provincia",
      city: "Localidad",
      address: "Dirección",
      urgency: "Urgencia",
      selectedServices: "Servicios seleccionados",
      problemDescription: "Descripción del problema",
    },
  },

  resumenValoracion: {
    quantityLabel: "Cantidad",
    lockChangeNote: "1ª puerta al precio base, siguientes a 45€",
    pricePending: "precio pendiente de configurar",
    totalLabel: "Total aproximado:",
    warningBox:
      "Este precio es orientativo y no es definitivo. Falta sumar distancia, desplazamiento, urgencia y la valoración final del trabajo.",
    extraMessagePlaceholder:
      "Añade información extra si quieres (horario, dirección aproximada, problema concreto...)",
    userEmail: "Correo del usuario",
    userPhone: "Teléfono del usuario",
    userCity: "Municipio",
    notAvailable: "No disponible",
    emailButton: "Enviar valoración por correo",
    whatsappButton: "Enviar valoración por WhatsApp",
  },

  servicioCard: {
    from: "Desde",
    consult: "Consultar",
    urgentOnly: "Urgente",
    lockChangeNote: "1ª puerta al precio base, siguientes a 45€",
    adminDragHint: "Admin: arrastra para cambiar el orden",
    addToQuote: "Añadir a la valoración",
    removeFromQuote: "Quitar de la valoración",
    editService: "Editar servicio",
    urgentCheckbox: "Urgente",
    activeCheckbox: "Activo",
    save: "Guardar",
    cancel: "Cancelar",
    placeholders: {
      nombre: "Nombre",
      descripcion: "Descripción",
      precioBase: "Precio base",
      imagenUrl: "URL de la imagen",
    },
  },
};

export default es;