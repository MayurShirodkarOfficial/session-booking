const generateICSFileContent = (sessionDetails:any) =>{
    const eventStart = new Date(sessionDetails.startTime).toISOString().replace(/-/g, '').replace(/:/g, '').slice(0, -5);
    const eventEnd = new Date(sessionDetails.endTime).toISOString().replace(/-/g, '').replace(/:/g, '').slice(0, -5);
    const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      BEGIN:VEVENT
      DTSTART:${eventStart}
      DTEND:${eventEnd}
      SUMMARY:${sessionDetails.summary || 'Session with Speaker'}
      DESCRIPTION:${sessionDetails.description || 'Description of the session'}
      END:VEVENT
      END:VCALENDAR
    `;
    return icsContent;
  }
  