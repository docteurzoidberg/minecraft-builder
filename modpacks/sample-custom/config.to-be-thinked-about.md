
tpptek-debug

    clients
        atlauncher  
            build
                skip: false,
                output: "build/${MODPACKNAME}/${VERSION}/client-atlauncher",
                copyfolders: [
                    $modpack/common
                    $modpack/client-common
                    $modpack/client-atlauncher
                ]    
                dist
                    skip: false,
                    output: "PATH TO ATLAUNCHER INSTANCES",
                    
                    zips: [
                        {
                            skip: true,
                            path: "build/${MODPACKNAME}/${VERSION}/client-atlauncher"
                            dest: "dist/${MODPACKNAME}/client-atlauncher.${VERSION}.zip
                        }
                    ],
                    copyfolders: [
                        "build/${MODPACKNAME}/${VERSION}/client-atlauncher"
                    ]

        technicpack
            build
                skip: false,
                output: "build/${MODPACKNAME}/${VERSION}/client-techniclauncher",
                copyfolders: [
                    $modpack/common
                    $modpack/client-common
                    $modpack/client-technic
                ]

                dist
                    skip: false,
                    
                    zips: [
                        {
                            skip: true,
                            //source: "build/${MODPACKNAME}/${VERSION}/client-technicpack"
                            //-> TODO: use build output path if source not set
                            dest: "dist/${MODPACKNAME}/client-techniclauncher.${VERSION}.zip
                            //use dist default output path if source not set
                        }
                    ],
                    copyfolder: [
                        {
                            //source: "build/${MODPACKNAME}/${VERSION}/client-technicpack"
                            //-> TODO: use build output path if source not set
                            dest: "PATH TO ATLAUNCHER INSTANCES",
                        }
                    ]
    server
        develop
            build
                skip = false
                output: "build/${MODPACKNAME}/${VERSION}/server-develop",
                copyfolders: [
                    $modpack/common
                    $modpack/server-common
                    $modpack/server-develop
                ]
        develop
            build
                skip = false
                output: "build/${MODPACKNAME}/${VERSION}/server-production",
                copyfolders: [
                    $modpack/common
                    $modpack/server-common
                    $modpack/server-production