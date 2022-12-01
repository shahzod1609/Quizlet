import React, { useContext, useEffect, useState } from 'react';
import ModuleList from './ModuleList';
import { AuthContext } from '../../shared/context/auth-context';




const ModuleListApp = ({data}) => {
    return (<div className="moduleList-in-papka-in"><h1 className="med">Modullaryň sany!!({data.length})</h1>
      <ModuleList words={data} />
      </div>
    );
  };



 

export default ModuleListApp;