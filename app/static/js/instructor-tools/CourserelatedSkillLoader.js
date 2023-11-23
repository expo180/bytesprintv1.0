$(document).ready(function() {
    
      var selectedSkills = [];  // Array to store selected skills

      var skillsDict = {
            'AI': [
                  'Machine Learning', 
                  'Deep Learning', 
                  'Natural Language Processing',
                  'Neural Network',
                  'Tensorflow',
                  'Python (fundamental)',
                  'R (statistical programming)',
                  'Linear Algebra',
                  'Calculus',
                  'Probability',
                  'Statistics',
                  'Supervised Learning',
                  'Unsupervised Learning',
                  'Semi-Supervised Learning',
                  'Reinforcement Learning',
                  'Neural Networks',
                  'Convolutional Neural Networks (CNN)',
                  'Recurrent Neural Networks (RNN)',
                  'Generative Adversarial Networks (GAN)',
                  'Transfer Learning',
                  'Text Processing',
                  'Named Entity Recognition (NER)',
                  'Sentiment Analysis',
                  'Language Modeling',
                  'Machine Translation',
                  'Image Classification',
                  'Object Detection',
                  'Image Segmentation',
                  'Facial Recognition',
                  'Feature Engineering',
                  'Data Cleaning',
                  'Data Transformation',
                  'TensorFlow',
                  'PyTorch',
                  'Scikit-Learn',
                  'Keras',
                  'Theano',
                  'Caffe',
                  'Git',
                  'Hadoop',
                  'Apache Spark',
                  'AWS', 
                  'Azure', 
                  'Google Cloud',
                  'Jupyter Notebooks',
                  'PyCharm',
                  'VSCode',
                  'Matplotlib',
                  'Seaborn',
                  'Plotly',
                  'SQL',
                  'MongoDB',
                  'Slack',
                  'Trello',
                  'GitHub',
                  'TensorBoard',
                  'MLflow',
                  'Docker',
                  'Jenkins',
                  'Pytest',
            ],
            'Robotics': [
                  'C++',
                  'Python',
                  'ROS (Robot Operating System)',
                  'Linear Algebra',
                  'Calculus',
                  'Kinematics',
                  'Dynamics',
                  'Solid Mechanics',
                  'Dynamics of Machinery',
                  'Robotics Kinematics and Dynamics',
                  'Circuit Design',
                  'Control Systems',
                  'Electronics',
                  'PID Control',
                  'State-Space Representation',
                  'Feedback Systems',
                  'Object Recognition',
                  'Image Processing',
                  'SLAM (Simultaneous Localization and Mapping)',
                  'Lidar',
                  'Cameras',
                  'IMU (Inertial Measurement Unit)',
                  'ROS Architecture',
                  'ROS Services',
                  'ROS Nodes',
                  'Integration of Mechanical and Electronic Systems',
                  'Actuator and Sensor Selection',
                  'Reinforcement Learning for Robot Control',
                  'Perception using Machine Learning',
                  'Gazebo',
                  'V-REP (Virtual Robot Experimentation Platform)',
                  'ROS (Robot Operating System)',
                  'OpenCV for Computer Vision',
                  'Arduino',
                  'Raspberry Pi',
                  'TurtleBot', 
                  'Robolink',
                  'SolidWorks',
                  'AutoCAD',
                  'MATLAB/Simulink',
                  'CoppeliaSim',
                  'MQTT (Message Queuing Telemetry Transport)',
                  'OPC UA (Unified Architecture)',
                  'Git',
                  'Jenkins',
            ],
            'Web_Dev': [
                  'Semantic HTML',
                  'HTML5 features',
                  'CSS Layouts',
                  'CSS Pre-processors',
                  'SASS',
                  'LESS',
                  'Responsive Web Design',
                  'ECMAScript 6 (ES6) features',
                  'AJAX (Asynchronous JavaScript and XML)',
                  'DOM Manipulation',
                  'React.js',
                  'Angular',
                  'Bootstrap',
                  'Tailwind',
                  'Algorithms',
                  'SSL',
                  'Web Scraping',
                  'Vue.js',
                  'Node.js', 
                  'Python', 
                  'Ruby', 
                  'PHP',
                  'RESTful API Design',
                  'Authentication and Authorization',
                  'SQL',
                  'NoSQL Databases (e.g., MongoDB)',
                  'Git Commands',
                  'Git Branching and Merging',
                  'npm (Node Package Manager)',
                  'yarn',
                  'Media Queries',
                  'Mobile-First Development',
                  'Page Load Speed',
                  'Minification and Compression',
                  'Chrome DevTools',
                  'Firefox Developer Tools',
                  'Unit Testing',
                  'Jest', 
                  'Mocha',
                  'Browser Testing', 
                  'Selenium', 
                  'Cypress',
                  'Caching',
                  'Lazy Loading',
                  'HTTPS',
                  'Cross-Site Scripting (XSS)',
                  'Cross-Site Request Forgery (CSRF) Prevention',
                  'WordPress',
                  'Drupal',
                  'Basic Command Line Usage',
                  'Shell Scripting',
                  'WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)',
                  'Semantic HTML for Accessibility',
                  'Cloud Platforms', 
                  'AWS', 
                  'Azure', 
                  'Google', 
                  'Cloud',
                  'Nginx', 
                  'Apache',
                  'Server Deployment',
                  'Agile Methodologies',
                  'Project Management'
            ],
            'DevOps': [
                  'Continuous Integration (CI)', 
                  'Containerization', 
                  'Orchestration',
                  'Continuous Integration', 
                  'Jenkins',
                  'Travis CI',
                  'GitLab CI/CD',
                  'CircleCI',
                  'Docker',
                  'Orchestration',
                  'Kubernetes',
                  'Swarm',
                  'Configuration Management',
                  'Ansible',
                  'Puppet',
                  'Chef',
                  'Version Control',
                  'Git',
                  'GitHub',
                  'GitLab',
                  'Infrastructure as Code (IaC)',
                  'Terraform',
                  'CloudFormation',
                  'Monitoring and Logging',
                  'ELK Stack', 
                  'Elasticsearch', 
                  'Logstash', 
                  'Kibana',
                  'Prometheus',
                  'Grafana',
                  'Splunk',
                  'Collaboration and Communication',
                  'Slack',
                  'Microsoft Teams',
                  'Cloud Platforms',
                  'Amazon Web Services (AWS)',
                  'Microsoft Azure',
                  'Google Cloud Platform (GCP)',
                  'Build Tools',
                  'Maven',
                  'Gradle',
                  'Artifact Repository',
                  'Nexus',
                  'Artifactory',
                  'Continuous Deployment (CD)',
                  'Spinnaker',
                  'Argo CD',
                  'Scripting Languages',
                  'Shell Scripting',
                  'Python',
                  'DevSecOps Practices',
                  'Security Scanning Tools', 
                  'SonarQube',
                  'Atlassian', 
                  'Stack', 
                  'Jira', 
                  'Confluence', 
                  'Bitbucket',
                  'GitLab',
                  'CI/CD Pipelines',
                  'Pipeline Orchestration',
                  'Automated Testing in Pipelines',
                  'Release Management',
                  'Feature Flags',
                  'Blue-Green Deployments',
                  'Microservices Architecture',
                  'Service Mesh (e.g., Istio)',
                  'API Gateways',
                  'Infrastructure Monitoring',
                  'Nagios',
                  'Zabbix',
                  'Incident Management',
                  'PagerDuty',
                  'VictorOps',
                  'Documentation',
                  'Markdown',
                  'AsciiDoc'
            ],
            'Crypto': [
                  'Blockchain', 
                  'Smart Contracts', 
                  'Cryptography',
                  'Solidity', 
                  'Ethereum Virtual Machine (EVM)',
                  'Web3.js',
                  'JavaScript',
                  'Truffle',
                  'Remix IDE',
                  'Ganache',
                  'Consensus Algorithms',
                  'Token Standards',
                  'Decentralized Finance',
                  'Smart Contract Security Best Practices',
                  'Wallet Integration',
                  'Public and Private Keys',
                  'Hash Functions',
                  'Digital Signatures',
                  'Blockchain Explorer',
                  'Etherscan',
                  'InterPlanetary File System',
                  'Solidity Testing Frameworks',
                  'Mocha', 
                  'Chai',
                  'Permissioned Blockchains', 
                  'Hyperledger Fabric',
                  'DApp',
                  'ConsenSys Developer',
                  'Tools',
                  'Infura', 
                  'MetaMask',
                  'Blockchain Governance Models',
                  'Oracle Integration'
            ],
            'Data_Science': [
                  'Data Analysis', 
                  'Statistical Modeling', 
                  'Data Visualization',
                  'Python',
                  'R',
                  'Pandas',
                  'NumPy',
                  'Matplotlib',
                  'Seaborn',
                  'Plotly',
                  'Scikit-learn',
                  'TensorFlow',
                  'PyTorch',
                  'Keras',
                  'Data Cleaning and Preprocessing',
                  'Exploratory Data Analysis (EDA)',
                  'Feature Engineering',
                  'Statistical Analysis',
                  'Hypothesis Testing',
                  'Regression Analysis',
                  'Classification and Clustering Algorithms',
                  'Natural Language Processing (NLP)',
                  'Time Series Analysis',
                  'Big Data',
                  'Apache Spark',
                  'Hadoop',
                  'Hive',
                  'SQL',
                  'NoSQL',
                  'MongoDB',
                  'PostgreSQL',
                  'Data Warehousing',
                  'AWS',
                  'Google Cloud Platform',
                  'Microsoft Azure',
                  'Jupyter Notebooks',
                  'RStudio',
                  'Version Control',
                  'Git',
                  'Slack'
            ],
            'App_Dev': [
                'Mobile App Development',
                'iOS Development',
                'Swift Programming Language',
                'Android Development',
                'Java Programming Language',
                'Kotlin Programming Language',
                'Cross-Platform Development',
                'Flutter Framework',
                'React Native Framework',
                'User Interface (UI) Design',
                'User Experience (UX) Design',
                'Mobile App Testing and Debugging',
                'Mobile App Security',
                'RESTful API Integration',
                'Database Management in Mobile Apps',
                'Cloud Integration in Mobile Apps',
                'Push Notifications',
                'Mobile App Performance Optimization',
                'Mobile App Monetization Strategies',
                'Augmented Reality (AR) in Mobile Apps',
                'Internet of Things (IoT) Integration in Mobile Apps',
                'Mobile App Analytics',
                'Mobile App Distribution (App Store, Google Play)',
                'Mobile App Accessibility',
                'Mobile App Localization',
                'Continuous Learning and Skill Improvement in App Development',
                'Emerging Technologies in Mobile App Development',
                'Mobile App Industry Trends',
                'Legal and Ethical Considerations in App Development',
                'App Development Project Management',
                'App Development Conferences and Events',
            ],

            'Game_Dev': [
                'Game Design',
                'Game Programming',
                'Game Design Principles',
                'Unity3D Framework',
                'C# Programming Language',
                'C++',
                'React Native',
                'JavaScript',
                '3D Modeling',
                'Animation',
                'Physics in Game Development',
                'Shader Programming',
                'Virtual Reality (VR)',
                'Augmented Reality (AR)',
                'Multiplayer Game Development',
                'Game Testing and Debugging',
                'Game AI Programming',
                'Level Design',
                'Game Monetization Strategies',
                'Mobile Game Development',
                'Console Game Development',
                'PC Game Development',
                'Game Development Platforms', 
                'Steam',
                'Epic Games Store',
                'Game Development Tools',
                'Unreal Engine', 
                'Godot',
                'Game Development Documentation',
                'Community Engagement in Game Development',
                'Game Analytics and Metrics',
                'Game Industry Trends',
                'Game Marketing and Promotion',
                'Legal and Ethical Considerations in Game Development',
                'Game Development Project Management',
                'Game Development Conferences and Events',
                'Continuous Learning and Skill Improvement in Game Development',
            ],
            'Cybersecurity': [
                'Network Security',
                'Penetration Testing',
                'Security Protocols',
                'Ethical Hacking',
                'Security Protocols and Standards',
                'Cryptography',
                'Security Auditing',
                'Incident Response',
                'Firewall and Intrusion Detection Systems (IDS)',
                'Secure Coding Practices',
                'Security Risk Management',
                'Vulnerability Assessment',
                'Security Operations Center (SOC)',
                'Threat Intelligence',
                'Malware Analysis',
                'Digital Forensics',
                'Wireless Network Security',
                'Cloud Security',
                'Identity and Access Management (IAM)',
                'Security Awareness and Training',
                'Web Application Security',
                'Mobile Security',
                'Endpoint Security',
                'Data Loss Prevention (DLP)',
                'Security Governance',
                'Compliance and Regulatory Standards',
                'Blockchain Security',
                'IoT Security',
                'Biometric Security',
                'Quantum Cryptography',
                'Security in Virtualized Environments',
                'Red Team and Blue Team Exercises',
                'Security Automation and Orchestration',
                'Zero Trust Security Model',
                'Cybersecurity Laws and Ethics',
                'Security in Artificial Intelligence (AI) Systems',
                'Ransomware Protection and Recovery',
                'Honeypots and Deception Technologies',
                'Social Engineering Defense',
                'Critical Infrastructure Protection',
                'Security for Industrial Control Systems (ICS)',
                'Cybersecurity Certifications',
                'CISSP', 
                'CEH', 
                'CompTIA', 
                'Security+',
                'Cybersecurity Career Paths and Skills Development'
            ]

      };

    $('#techField').change(function() {
        var selectedTech = $(this).val();
        updateRelatedSkills(selectedTech);
    });

    $(document).on('click', '.related-skills', function() {
        var clickedSkill = $(this).text()
        // Toggle selection
        if (selectedSkills.includes(clickedSkill)) {
            // Skill is already selected, remove it
            selectedSkills = selectedSkills.filter(skill => skill !== clickedSkill);
        } else {
            // Skill is not selected, add it
            selectedSkills.push(clickedSkill);
        }

        // Update button style based on selection
        $(this).toggleClass('selected-skill');

        // You can display the selected skills in a separate container if needed
        displaySelectedSkills();
    });

    function updateRelatedSkills(techField) {
        var relatedSkillsList = $('#relatedSkillsList');
        relatedSkillsList.empty();

        var skills = skillsDict[techField] || [];

        if (skills.length > 0) {
            $.each(skills, function(index, skill) {
              relatedSkillsList.append('<li class="list-inline-item mb-3"><span class="badge related-skills selected-skill text-primary border border-primary  rounded-pill">' + skill + '</span></li>');
            });
        } else {
            relatedSkillsList.append('<li class="list-inline-item text-body-secondary">No related skills found.</li>');
        }
    }

    function displaySelectedSkills() {
        // Get the target div
        var selectedSkillsDiv = $('.SelectedSkillsList');
        // Clear existing content
        selectedSkillsDiv.empty();
        // Display the selected skills inside the div
        $.each(selectedSkills, function(index, skill) {
          selectedSkillsDiv.append('<li class="list-inline-item"><span class="badge bg-primary">' + skill + '<span class="remove-skill" data-skill="' + skill + '"> &#x2716;</span></span></li>');
        });
        //click event to the remove-skill span
        $('.remove-skill').click(function() {
          var skillToRemove = $(this).data('skill');
          // Remove the skill from the selectedSkills array
          selectedSkills = selectedSkills.filter(skill => skill !== skillToRemove);
          // Remove the corresponding badge from the display
          $(this).parent().remove();
          // Update the style of the related-skills button
          $('.related-skills:contains(' + skillToRemove + ')').removeClass('selected-skill');
        });
    }
    // Button to save skills to the session
    $('#saveSkillsButton').click(function() {
      $.ajax({
        url: 'http://127.0.0.1:5000/api/v1/save_skills',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ skills: selectedSkills }),
        success: function(response) {
        if (response.success) {
          // Show success message using SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Skills Saved!',
            text: response.message,
          });
        } else {
            // Show error message using SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: response.message,
            });
          }
        },
        error: function(error) {
          // Show error message using SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to save skills. Please try again.',
          });
        }
      });
  });

    // Button to clear selected skills
    $('#clearSkillsButton').click(function() {
      // Clear the selected skills array
      selectedSkills = [];
      // Clear the style and display
      $('.related-skills').removeClass('selected-skill');
      displaySelectedSkills();
    });
});
