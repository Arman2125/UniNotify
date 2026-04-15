const opportunityEmailTemplate = (opportunity) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Opportunity Posted!</h2>
      
      <p><strong>${opportunity.title}</strong></p>
      <p>${opportunity.description}</p>

      <a href="http://localhost:8080/opportunity/${opportunity._id}" 
         style="
           display: inline-block;
           padding: 12px 20px;
           margin-top: 10px;
           background-color: #007bff;
           color: #ffffff;
           text-decoration: none;
           border-radius: 5px;
           font-weight: bold;
         ">
         View Opportunity
      </a>

      <p style="margin-top: 20px;">- UniNotify Team</p>
    </div>
    `;
};

module.exports = opportunityEmailTemplate;