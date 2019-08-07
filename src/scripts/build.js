/*

Build modpack(s)

Usage:
    npm run build modpack               build all modpack artefacts
    npm run build modpack:artefact      build modpack/artefact

Exemple:

    npm run build sample-custom client-atlauncher
    > build sample-custom/client-atlauncher
    
    or

    npm run build sample-custom server-prod
    -> build sample-custom/server-prod,

    or 

    npm run build sample-custom     
    -> build sample-custom/client-atlauncher
    -> build sample-custom/client-technic,
    -> build sample-custom/server-prod,
    -> build sample-custom/server-dev,
    -> build sample-custom/launcher

*/