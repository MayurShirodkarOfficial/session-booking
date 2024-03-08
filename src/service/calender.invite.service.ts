const generateICSFileContent = (sessionDetails:any) =>{
    const eventStart = new Date(sessionDetails.startTime);
    const eventEnd = new Date(sessionDetails.endTime);
    const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      BEGIN:VEVENT
      DTSTART:${eventStart}
      DTEND:${eventEnd}
      SUMMARY:${sessionDetails.summary || 'Session with Speaker'}
      DESCRIPTION:${sessionDetails.description || 'Your Session is scheduled , you need to attend at allotted slot'}
      END:VEVENT
      END:VCALENDAR
    `;
    return icsContent;
  }
  export {generateICSFileContent};